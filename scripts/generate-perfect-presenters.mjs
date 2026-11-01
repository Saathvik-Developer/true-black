import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generate() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const configs = {
    // 1: Male barista/manager, 909x1730
    1: { scale: 0.96, headTop: 63, centerX: 470 },
    // 2: Female barista/manager, 1195x1316
    2: { scale: 0.90, headTop: 110, centerX: 645 },
    // 3: Female barista/manager, 1088x1445
    3: { scale: 1.02, headTop: 245, centerX: 540 },
    // 4: Male manager, 1099x1431
    4: { scale: 1.02, headTop: 92, centerX: 545 },
    // 5: Male manager
    5: { scale: 1.58, headTop: 53, centerX: 527 },
    // 6: Male barista/manager
    6: { scale: 1.92, headTop: 420, centerX: 555 },
  };

  const TARGET_W = 1000;
  const TARGET_H = 1400;
  const TARGET_HEAD_TOP = 80;
  const TARGET_CENTER_X = 500;

  const outDir = path.resolve('public/images/presenters/standardized');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 1; i <= 6; i++) {
    const cfg = configs[i];
    const dataUrl = await page.evaluate(
      async ({ i, cfg, TARGET_W, TARGET_H, TARGET_HEAD_TOP, TARGET_CENTER_X }) => {
        const img = new Image();
        img.src = '/images/presenters/presenter' + i + '.png';
        await new Promise((r) => (img.onload = r));

        const canvas = document.createElement('canvas');
        canvas.width = TARGET_W;
        canvas.height = TARGET_H;
        const ctx = canvas.getContext('2d');

        const destY = TARGET_HEAD_TOP - cfg.headTop * cfg.scale;
        const destX = TARGET_CENTER_X - cfg.centerX * cfg.scale;
        const drawW = img.naturalWidth * cfg.scale;
        const drawH = img.naturalHeight * cfg.scale;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, destX, destY, drawW, drawH);

        // Find actual lowest non-transparent pixel row
        const imgData = ctx.getImageData(0, 0, TARGET_W, TARGET_H);
        const data = imgData.data;
        let actualBottom = 0;
        for (let y = TARGET_H - 1; y >= 0; y--) {
          let count = 0;
          for (let x = 0; x < TARGET_W; x++) {
            if (data[(y * TARGET_W + x) * 4 + 3] > 30) count++;
          }
          if (count >= 15) {
            actualBottom = y;
            break;
          }
        }

        // Feather the bottom 110px of the actual content
        const featherHeight = 110;
        const featherStart = Math.max(0, actualBottom - featherHeight);
        for (let y = featherStart; y <= actualBottom; y++) {
          const factor = (actualBottom - y) / featherHeight;
          const easeFactor = Math.pow(factor, 1.2); // smooth ease
          for (let x = 0; x < TARGET_W; x++) {
            const idx = (y * TARGET_W + x) * 4 + 3;
            if (data[idx] > 0) {
              data[idx] = Math.round(data[idx] * easeFactor);
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);

        return canvas.toDataURL('image/png');
      },
      { i, cfg, TARGET_W, TARGET_H, TARGET_HEAD_TOP, TARGET_CENTER_X }
    );

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(outDir, `presenter${i}.png`), Buffer.from(base64Data, 'base64'));
    console.log(`Saved refined standardized presenter ${i}`);
  }

  await browser.close();
}

generate().catch(console.error);
