// pageObjects/PolestarPage.js
const { expect } = require('@playwright/test');
const { timeout } = require('../../playwright.config');

class PolestarDevPage {
  constructor(page) {
    this.page = page;

  }

  // Navigate to the Polestar Developer page
  async navigate() {
    await this.page.goto('https://www.polestar.com/se/developer/get-started/');
  }

  // Close the cookie popup if it appears
  async closeCookieButton() {
    if (await this.page.waitForSelector("//*[@id='onetrust-policy-title']", { state: 'visible' }).then(el => el.isVisible())) {
      const cookiePopupCloseButton = this.page.locator("//button[@id='onetrust-accept-btn-handler']", { state: 'visible' });
      await cookiePopupCloseButton.click();
      console.log('closing the popup window.');
    } 
    else {
      console.log('No popup window found');
    }
  }


  // Check responsiveness by iterating over multiple viewports
  async checkResponsiveness(browserName) {

    const viewports = [
      { name: 'Desktop', viewport: { width: 1920, height: 1080 } },
      { name: 'Tablet', viewport: { width: 768, height: 1024 } },
      { name: 'Mobile', viewport: { width: 375, height: 667 } },
    ];

    for (const { name, viewport } of viewports) {
      await this.page.setViewportSize(viewport);
      console.log(`Testing viewport: ${viewport.width}x${viewport.height}`);
      // Take a screenshot
      const screenshotPath = `test/__screenshots__/screenshot-${name}.png`;
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      
      // Validate screenshot
      await expect(this.page).toHaveScreenshot({
        path: screenshotPath,
        fullPage: true,
        threshold: 1, // Tolerance for slight rendering differences
        animations: 'disabled',
        scale: 'css',
        maxDiffPixelRatio: 0.01, // Allow 1% of pixels to differ
        maxDiffPixels: 5,
        fullPage: false,
      });
      console.log(`Viewport ${name} test`);
    }
  }  
}
module.exports = { PolestarDevPage };
