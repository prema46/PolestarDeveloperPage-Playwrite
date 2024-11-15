// pageObjects/PolestarPage.js
const { expect } = require('@playwright/test');
const { timeout } = require('../../playwright.config');

class PolestarDevPage {
  constructor(page) {
    this.page = page;
   this.logo = this.page.locator('//*[@id="mega-menu-:r0:"]//header/a');

     // Define the locator for the text "Welcome" (use correct syntax)
     this.welcomeText = page.locator('text="Welcome"', {timeout:5000});
     this.cookiePopupCloseButton = page.locator('button:text("Accept all")', { state: 'visible'});
  }

  // Navigate to the Polestar Developer page
  async navigate() {
    await this.page.goto('https://www.polestar.com/se/developer/get-started/');
  }

  // Close the cookie popup if it appears
  async closeCookieButton() {
    const isVisible = await this.welcomeText.isVisible();
    if (isVisible) {
      // Ensure the element is ready before interacting
      await this.page.waitForSelector('button:text("Accept all")', { state: 'visible'});
      //await this.cookiePopupCloseButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookiePopupCloseButton.click();
      console.log('closing the popup window.');
    } else {
      console.log('No popup window found');
    }
  }


  async clickLogo() {
  await this.closeCookieButton();
  await this.page.waitForSelector('//*[@id="mega-menu-:r0:"]//header/a', { state: 'visible'});
  await this.logo.click();
  }

  // Check responsiveness by iterating over multiple viewports
  async checkResponsiveness() {
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
        threshold: 0.2 // Tolerance for slight rendering differences
      });
      console.log(`Viewport ${name} test completed.`);
    }
  }

  // Add a screenshot method
  async screenshot() {
    await this.page.screenshot({ path: 'screenshotsdd.png' });
  }

  // Wait for the page to load (timeout-based)
  async waitforPageloads() {
    await this.page.waitForTimeout(20000); 
  }

  

}

module.exports = { PolestarDevPage };
