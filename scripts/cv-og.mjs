// Renders the link-preview image cv/og.png (1200×630) used by /cv's og:image.
//   npm run cv:og

import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const output = fileURLToPath(new URL('../cv/og.png', import.meta.url));

const html = `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 84px 96px;
    background: #0a0a0a;
    color: #ffffff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .label {
    align-self: flex-start;
    padding: 6px 18px;
    border: 2px solid #4dabf7;
    border-radius: 8px;
    color: #4dabf7;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.14em;
  }
  h1 { font-size: 112px; font-weight: 700; line-height: 1; letter-spacing: -0.035em; }
  p { margin-top: 24px; color: #a3a3a3; font-size: 42px; font-weight: 500; }
  .site { color: #6b6b6b; font-size: 28px; }
</style>
</head>
<body>
  <div class="label">CV</div>
  <div>
    <h1>Jakub Vonášek</h1>
    <p>Founder · AI &amp; Full-Stack Engineer</p>
  </div>
  <div class="site">jakub-dev.com</div>
</body>
</html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html);
  await page.screenshot({ path: output, type: 'png' });
  console.log('Wrote cv/og.png');
} finally {
  await browser.close();
}
