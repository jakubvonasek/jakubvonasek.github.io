// Renders the link-preview image og.png (1200×630) used by the landing page's og:image.
//   npm run og

import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const output = fileURLToPath(new URL('../og.png', import.meta.url));

const html = `<!DOCTYPE html>
<html lang="en">
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
  .status {
    display: flex;
    align-items: center;
    gap: 16px;
    align-self: flex-start;
    padding: 10px 24px 10px 20px;
    border: 2px solid #262626;
    border-radius: 999px;
    color: #a3a3a3;
    font-size: 26px;
    font-weight: 500;
  }
  .dot { width: 14px; height: 14px; border-radius: 50%; background: #4ade80; }
  h1 { font-size: 112px; font-weight: 700; line-height: 1; letter-spacing: -0.04em; }
  p { margin-top: 24px; color: #a3a3a3; font-size: 42px; font-weight: 500; }
  .site { color: #6b6b6b; font-size: 28px; }
</style>
</head>
<body>
  <div class="status"><span class="dot"></span>Open to freelance work</div>
  <div>
    <h1>Jakub Vonášek</h1>
    <p>Founder of MakeIt3D · AI &amp; Full-Stack Engineer</p>
  </div>
  <div class="site">jakub-dev.com</div>
</body>
</html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html);
  await page.screenshot({ path: output, type: 'png' });
  console.log('Wrote og.png');
} finally {
  await browser.close();
}
