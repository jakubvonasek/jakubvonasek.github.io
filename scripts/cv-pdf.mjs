// Prints the /cv page to cv/Jakub_Vonasek_CV.pdf (A4, print stylesheet).
//   npm run serve      # in another terminal, serves the site on :3000
//   npm run cv:pdf
//
// CV_URL points it at another address, e.g. CV_URL=https://jakub-dev.com/cv/ npm run cv:pdf
// Needs Chromium for Playwright once: npx playwright install chromium

import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const url = process.env.CV_URL ?? 'http://localhost:3000/cv';
const output = new URL('../cv/Jakub_Vonasek_CV.pdf', import.meta.url);

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const response = await page.goto(url, { waitUntil: 'networkidle' }).catch((error) => {
    throw new Error(`Could not open ${url}. Is the site served (npm run serve)?\n${error.message}`);
  });
  if (!response.ok()) throw new Error(`${url} answered ${response.status()}`);

  await page.emulateMedia({ media: 'print' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
  await writeFile(output, pdf);

  const pages = pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)?.length ?? 0;
  console.log(`Wrote cv/Jakub_Vonasek_CV.pdf from ${url} (${pages} ${pages === 1 ? 'page' : 'pages'})`);
  if (pages > 2) console.warn('⚠ The CV is longer than 2 pages');
} finally {
  await browser.close();
}
