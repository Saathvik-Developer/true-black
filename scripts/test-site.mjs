import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('public/test-screenshots');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const errors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      console.error('BROWSER CONSOLE ERROR:', text);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(err.toString());
    console.error('PAGE ERROR:', err);
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for canvas or intro to be ready
  await page.waitForTimeout(2000);

  console.log('Capturing Intro screen...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '00-intro.png') });

  // Get report data
  const report = {
    consoleErrors: errors,
    chapters: [],
  };

  // Helper to press key or jump
  // In ScrollScene.tsx:
  // Key 1-6 jumps to chapter 0-5
  // Key G jumps to gallery
  // Key L jumps to lab
  // Key 0 jumps to intro
  
  for (let ch = 1; ch <= 6; ch++) {
    console.log(`Navigating to Chapter ${ch}...`);
    await page.keyboard.press(`${ch}`);
    // Wait for smooth scroll and animations
    await page.waitForTimeout(1800);

    const shotPath = path.join(OUTPUT_DIR, `chapter-0${ch}.png`);
    await page.screenshot({ path: shotPath });

    // Measure bounding boxes
    const metrics = await page.evaluate((chNum) => {
      // Find presenter image
      const presenterImgs = Array.from(document.querySelectorAll('img')).filter(img => 
        img.src.includes('presenter') && img.offsetParent !== null
      );
      const presenterEl = presenterImgs[0] || null;
      const pRect = presenterEl ? presenterEl.getBoundingClientRect() : null;

      // Find content panel container
      // Content panel contains the chapter heading
      const headings = Array.from(document.querySelectorAll('h2'));
      const activeHeading = headings.find(h => h.offsetParent !== null);
      const contentContainer = activeHeading ? activeHeading.closest('.pointer-events-auto') || activeHeading.parentElement : null;
      const cRect = contentContainer ? contentContainer.getBoundingClientRect() : null;

      // Horizontal overflow check
      const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

      // Overlap check
      let overlaps = false;
      let gap = 0;
      if (pRect && cRect) {
        // Presenter is on left, content is on right
        if (pRect.right > cRect.left && pRect.left < cRect.right) {
          overlaps = true;
        } else {
          gap = cRect.left - pRect.right;
        }
      }

      return {
        chapter: chNum,
        presenter: pRect ? { left: pRect.left, right: pRect.right, width: pRect.width, top: pRect.top, height: pRect.height } : null,
        content: cRect ? { left: cRect.left, right: cRect.right, width: cRect.width, top: cRect.top, height: cRect.height } : null,
        gapBetweenPresenterAndContent: gap,
        overlaps,
        hasHorizontalScroll,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      };
    }, ch);

    report.chapters.push(metrics);
    console.log(`Chapter ${ch} metrics:`, metrics);

    // If Chapter 6, also test tab switching
    if (ch === 6) {
      console.log('Testing Chapter 6 tab 2...');
      const tabButton = await page.locator('button:has-text("05–08 Flow & Capacity")');
      if (await tabButton.count() > 0) {
        await tabButton.click();
        await page.waitForTimeout(600);
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'chapter-06-tab2.png') });
      }
    }
  }

  // Navigate to Gallery [G]
  console.log('Navigating to Field Notes Gallery...');
  await page.keyboard.press('g');
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'gallery.png') });

  // Navigate to Operations Lab [L]
  console.log('Navigating to Operations Lab...');
  await page.keyboard.press('l');
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'operations-lab.png') });

  // Test smaller viewport (1366x768)
  console.log('Testing 1366x768 viewport...');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.keyboard.press('1');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'ch1-1366x768.png') });

  console.log('Analysis complete!');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'report.json'), JSON.stringify(report, null, 2));

  await browser.close();
}

run().catch((err) => {
  console.error('Fatal error during test:', err);
  process.exit(1);
});
