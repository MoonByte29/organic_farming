const { chromium } = require('C:/Users/uchan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = 'E:/Down/organic_farming/tmp/pdfs/screens';
(async () => {
  fs.mkdirSync(path, { recursive: true });
  const context = await chromium.launchPersistentContext('E:/Down/organic_farming/tmp/pdfs/edge-profile', {
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    args: ['--disable-features=msEdgeDualEngine']
  });
  const page = context.pages()[0];
  page.setDefaultTimeout(10000);
  async function ready() {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1400);
    await page.evaluate(() => document.fonts.ready);
  }
  async function shot(name, fullPage = true) {
    await page.screenshot({ path: `${path}/${name}.png`, fullPage, animations: 'disabled' });
    console.log(name, await page.evaluate(() => `${document.documentElement.scrollWidth}x${document.documentElement.scrollHeight}`));
  }
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded' });
  await ready();
  await shot('home');
  await page.getByRole('button', { name: 'Shop', exact: true }).click(); await ready(); await shot('shop');
  await page.getByRole('button', { name: 'Our Story', exact: true }).click(); await ready(); await shot('story');
  await page.getByRole('button', { name: 'Gifting & Bulk', exact: true }).click(); await ready(); await shot('bulk');
  await page.getByRole('button', { name: /Mitti & Monsoon/ }).first().click(); await ready();
  await page.getByText('Wood-Pressed Mustard Oil', { exact: true }).first().click();
  await page.waitForTimeout(800); await shot('product-detail', false);
  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded' });
  await mobile.waitForTimeout(1200); await mobile.evaluate(() => document.fonts.ready);
  await mobile.screenshot({ path: `${path}/home-mobile.png`, fullPage: false, animations: 'disabled' });
  await mobile.getByText('Wood-Pressed Mustard Oil', { exact: true }).first().click();
  await mobile.waitForTimeout(700);
  await mobile.screenshot({ path: `${path}/product-mobile.png`, fullPage: false, animations: 'disabled' });
  await context.close();
})().catch((err) => { console.error(err.stack || err); process.exit(1); });

