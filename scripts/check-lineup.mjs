import { chromium } from 'playwright';
import path from 'path';

async function testLineup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 600 });
  await page.goto('http://localhost:3000');

  const items = [1, 2, 3, 4, 5, 6].map(i => `
    <div class="col">
      <div class="label">Presenter ${i}</div>
      <img src="/images/presenters/standardized/presenter${i}.png" />
    </div>
  `).join('');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; background: #15120F; color: white; font-family: sans-serif; display: flex; flex-direction: column; }
          .guide { position: absolute; left: 0; right: 0; border-top: 1px dashed rgba(224, 163, 98, 0.6); z-index: 100; pointer-events: none; }
          .guide.crown { top: 30px; }
          .guide.eyes { top: 90px; }
          .guide.chin { top: 160px; }
          .row { display: flex; height: 550px; width: 100%; position: relative; }
          .col { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; position: relative; border-right: 1px solid #33261d; }
          .col img { width: 100%; height: 100%; object-fit: contain; object-position: bottom center; }
          .label { position: absolute; top: 10px; font-size: 14px; font-weight: bold; color: #E0A362; }
        </style>
      </head>
      <body>
        <div class="guide crown"></div>
        <div class="guide eyes"></div>
        <div class="guide chin"></div>
        <div class="row">
          ${items}
        </div>
      </body>
    </html>
  `);

  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public/test-screenshots/standardized-lineup.png') });
  console.log('Saved public/test-screenshots/standardized-lineup.png');
  await browser.close();
}

testLineup().catch(console.error);

