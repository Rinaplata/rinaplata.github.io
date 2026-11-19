// Generates tagged (accessible) PDFs of the /cv page in Spanish and English.
// Usage: start the dev server (npm start), then run `npm run cv:pdf`.
import { chromium } from '@playwright/test';

const BASE_URL = process.env.CV_BASE_URL ?? 'http://localhost:4200';
const TITLES = {
  es: 'Rina Plata — Currículo',
  en: 'Rina Plata — Resume'
};

const browser = await chromium.launch();

for (const language of ['es', 'en']) {
  const page = await browser.newPage();
  await page.addInitScript(lang => {
    localStorage.setItem('preferred-language', lang);
    localStorage.setItem('theme', 'light');
  }, language);
  await page.goto(`${BASE_URL}/#/cv`, { waitUntil: 'networkidle' });
  await page.evaluate(title => { document.title = title; }, TITLES[language]);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: `public/assets/pdf/cv-rina-plata-${language}.pdf`,
    format: 'A4',
    margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
    printBackground: true,
    tagged: true,
    outline: true
  });
  console.log(`Generated cv-rina-plata-${language}.pdf`);
  await page.close();
}

await browser.close();
