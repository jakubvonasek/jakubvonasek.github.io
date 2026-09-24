# Personal Website

Personal site and portfolio of Jakub Vonášek — live at [jakub-dev.com](https://jakub-dev.com).

Static HTML/CSS/JS. No build step, no runtime dependencies, no framework.
The only tooling is a small npm setup that generates the CV page (see [CV](#cv)).

## Running locally

Serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

You can also just `open index.html`, but prefer the server: root-relative
links (`/postit/`, `/round-corners/`) don't resolve over `file://`.

## Deploying

Hosted from the `jakubvonasek/jakubvonasek.github.io` repo — pushing to
`master` publishes the site. `CNAME` points it at `jakub-dev.com`, and
Vercel Analytics is loaded on the landing page.

## Structure

| Path               | What it is                                        |
| ------------------ | ------------------------------------------------- |
| `index.html`       | Landing page — hero, projects, contact            |
| `minesweeper.html` | Browser Minesweeper                               |
| `games/chess.html` | Browser chess                                     |
| `postit/`          | PostIt — gradient backgrounds for screenshots     |
| `round-corners/`   | Round Corners — rounds app-icon corners online    |
| `3d/`              | Redirect stub                                     |
| `emi/`             | Personal side page                                |
| `cv/`              | CV page, PDF and link-preview image (generated)   |
| `content/cv.md`    | CV source, the single source of truth for `cv/`   |
| `scripts/`         | CV build, PDF and preview-image scripts           |
| `cv.txt`           | Old CV (plain text)                               |

## Notes

`index.html` is self-contained: styles live in a single `<style>` block in
the `<head>`, scripts sit at the end of `<body>`.

The hero's AI prompt bar is a front-end piece with no backend — it matches
the query against keywords in `REPLIES` and streams a canned answer that
links to the relevant project. To wire it to a real model, replace
`pickReply()` with a fetch. All of its animations are disabled under
`prefers-reduced-motion`.

## CV

`/cv` is generated from `content/cv.md`. Edit the Markdown, then rebuild and
commit the output (GitHub Pages serves the committed files as they are):

```bash
npm install                        # once; dev tools only
npx playwright install chromium    # once, for the PDF and preview image
npm run cv:build                   # content/cv.md -> cv/index.html
npm run serve                      # serves the site on http://localhost:3000
npm run cv:pdf                     # (second terminal) -> cv/Jakub_Vonasek_CV.pdf
```

`cv:pdf` opens `http://localhost:3000/cv` by default; set `CV_URL` to print
another address. `npm run cv:og` redraws the link-preview image `cv/og.png`.

In `content/cv.md`, two trailing spaces are intentional hard line breaks; the
editor settings keep them. The build warns about invisible characters, broken
links and stray `*` in the source. The page is `noindex, nofollow` and is not
linked from the site; `_config.yml` keeps the Markdown and tooling out of the
published site.

## Conventions

- Standard HTML5 / CSS3, 2-space indentation
- Clean, commented JavaScript
- Both light and dark color schemes are supported — check changes in both
