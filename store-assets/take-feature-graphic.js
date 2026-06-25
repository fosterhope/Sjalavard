/**
 * Generate feature-graphic.png from feature-graphic-1024x500.html
 * Playwright screenshots the #canvas div at exactly 1024x500 px.
 * Run: NODE_PATH="/Users/sanctuarychurch/.npm/_npx/361ceb562f3b3235/node_modules" node take-feature-graphic.js
 */
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  // Use deviceScaleFactor: 1 so CSS px = actual px (1024x500 output)
  await page.setViewportSize({ width: 1200, height: 700 });
  await page.emulateMedia({ colorScheme: 'light' });

  const htmlPath = path.join(__dirname, 'feature-graphic-1024x500.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'load' });
  await page.waitForTimeout(500); // Let blur filters render

  const canvas = await page.$('#canvas');
  if (!canvas) {
    console.error('ERROR: #canvas not found');
    process.exit(1);
  }

  const outPath = path.join(__dirname, 'feature-graphic.png');
  await canvas.screenshot({ path: outPath });

  const { width, height } = await canvas.boundingBox();
  console.log(`Done. Saved to: ${outPath} (${width}x${height})`);

  await browser.close();
})();
