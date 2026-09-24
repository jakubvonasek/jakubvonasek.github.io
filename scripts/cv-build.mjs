// Builds the static CV page cv/index.html from content/cv.md.
//   npm run cv:build
//
// content/cv.md is the single source of truth; scripts/cv-template.html holds
// the page shell (meta tags, styles, download button). The output is committed,
// so the site keeps deploying without a build step.

import { readFile, writeFile } from 'node:fs/promises';
import { Marked, Renderer } from 'marked';

const root = new URL('../', import.meta.url);
const SOURCE = new URL('content/cv.md', root);
const TEMPLATE = new URL('scripts/cv-template.html', root);
const OUTPUT = new URL('cv/index.html', root);

const md = new Marked({
  gfm: true,
  renderer: {
    // External links open in a new tab; mailto: and relative links keep the default
    link(token) {
      if (!/^https?:\/\//i.test(token.href)) return false;
      const html = Renderer.prototype.link.call(this, token);
      return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
    },
  },
});

// Czech typography, applied to rendered text only (never to the source or to URLs)
function typeset(text) {
  return text
    // One-letter prepositions and conjunctions never end a line
    .replace(/(?<=^|[\s(„"])([aikosuvzAIKOSUVZ]) /g, '$1\u00A0')
    // Keep " · " and " – " separators on the line of the word before them
    .replace(/ (?=[·–] )/g, '\u00A0')
    // Keep a month with its year ("září 2024")
    .replace(/(?<=\p{L}) (?=\d{4}\b)/gu, '\u00A0')
    // Never split a number between digit groups, or a range like 0,781–0,843
    .replace(/(?<=\d) (?=\d)/g, '\u00A0')
    .replace(/(?<=\d)–(?=\d)/g, '–\u2060');
}

const inline = (tokens) => md.Parser.parseInline(tokens, md.defaults).trim();

// A paragraph's inline tokens, split at hard line breaks (two trailing spaces)
const lines = (paragraph) =>
  paragraph.tokens.reduce((acc, token) => {
    if (token.type === 'br') acc.push([]);
    else acc.at(-1).push(token);
    return acc;
  }, [[]]);

function paragraph(lineTokens, className) {
  const cls = className ? ` class="${className}"` : '';
  if (lineTokens.length === 1) return `<p${cls}>${inline(lineTokens[0])}</p>`;
  const spans = lineTokens.map((line) => `<span class="line">${inline(line)}</span>`);
  return `<p${cls}>${spans.join('')}</p>`;
}

// Points out source problems that would render oddly; never changes the source
function lint(source, tokens, html) {
  const warnings = [];
  source.split('\n').forEach((line, i) => {
    if (/[​-‍﻿]/.test(line)) warnings.push(`line ${i + 1}: zero-width character`);
  });
  md.walkTokens(tokens, (token) => {
    if (token.type === 'link' && !/^(https?:\/\/|mailto:)/.test(token.href)) {
      warnings.push(`broken link href "${token.href}"`);
    }
  });
  const text = html.replace(/<[^>]+>/g, '');
  if (text.includes('*')) warnings.push('literal "*" in rendered text (unbalanced emphasis?)');
  for (const warning of warnings) console.warn(`⚠ content/cv.md: ${warning}`);
}

function render(source) {
  const tokens = md.lexer(source);
  md.walkTokens(tokens, (token) => {
    if (token.type === 'text' && !token.tokens) token.text = typeset(token.text);
  });

  const header = [];
  const body = [];
  let out = body;
  let headerLines = 0;
  let sectionOpen = false;
  let entryOpen = false;
  let divided = false; // an hr precedes the next section
  let expectMeta = false; // the paragraph right after an h3 is its meta line

  const closeEntry = () => {
    if (entryOpen) body.push('</div>');
    entryOpen = false;
  };
  const closeSection = () => {
    closeEntry();
    if (sectionOpen) body.push('</section>');
    sectionOpen = false;
  };

  for (const token of tokens) {
    if (token.type === 'space') continue;

    if (token.type === 'hr') {
      divided = true;
      continue;
    }

    if (token.type === 'heading' && token.depth === 1) {
      out = header;
      header.push(`<h1>${inline(token.tokens)}</h1>`);
      continue;
    }

    if (token.type === 'heading' && token.depth === 2) {
      closeSection();
      out = body;
      body.push(`<section class="cv-section${divided ? ' divided' : ''}">`);
      body.push(`<h2>${inline(token.tokens)}</h2>`);
      sectionOpen = true;
      divided = false;
      continue;
    }

    if (token.type === 'heading' && token.depth === 3) {
      closeEntry();
      body.push('<div class="entry">', `<h3>${inline(token.tokens)}</h3>`);
      entryOpen = true;
      expectMeta = true;
      continue;
    }

    // Header: first line is the subtitle, the rest is the contact line
    if (out === header && token.type === 'paragraph') {
      for (const line of lines(token)) {
        header.push(paragraph([line], headerLines++ === 0 ? 'subtitle' : 'contact'));
      }
      continue;
    }

    if (expectMeta && token.type === 'paragraph') {
      const [first, ...rest] = lines(token);
      body.push(paragraph([first], 'meta'));
      if (rest.length) body.push(paragraph(rest));
      expectMeta = false;
      continue;
    }
    expectMeta = false;

    out.push(token.type === 'paragraph' ? paragraph(lines(token)) : md.parser([token]).trim());
  }
  closeSection();

  // Spell the invisible characters out so they stay visible in the generated HTML
  const finish = (parts) =>
    parts.join('\n').replaceAll('\u00A0', '&nbsp;').replaceAll('\u2060', '&#8288;');
  return { tokens, header: finish(header), body: finish(body) };
}

const [source, template] = await Promise.all([
  readFile(SOURCE, 'utf8'),
  readFile(TEMPLATE, 'utf8'),
]);
const { tokens, header, body } = render(source);
lint(source, tokens, header + body);

const page = template
  .replace('<!-- cv:header -->', () => header)
  .replace('<!-- cv:body -->', () => body);
await writeFile(OUTPUT, page);
console.log(`Wrote ${OUTPUT.pathname.replace(root.pathname, '')}`);
