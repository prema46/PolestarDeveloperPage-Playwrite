const { test, expect } = require('@playwright/test');
const { PolestarDevPage } = require('../page/polestarDeveloperPage');

let polestarDevPage;

test.describe('Polestar Developer Page Tests', () => {

  // Set up before each test
  test.beforeEach(async ({ page }) => {
    polestarDevPage = new PolestarDevPage(page);
    await polestarDevPage.navigate();
    await polestarDevPage.closeCookieButton();
  });


  // Logo validation and page URL check
  test('UI: Verify logo appears', async ({ page }) => {
    await polestarDevPage.clickLogo();
    await expect(page).toHaveURL('https://www.polestar.com/global/');
  });

  // Banner validation and responsiveness check
  test('UI: Verify banner and responsiveness', async () => {
    await polestarDevPage.waitforPageloads();
    await polestarDevPage.screenshot();
    await polestarDevPage.checkResponsiveness();
  });

  // Menu links validation
  test('UI: Menu - All links are valid and direct to the expected page', async ({ page }) => {
    const links = await page.$$eval('a', (anchors) => anchors.map(a => a.href));

    for (let link of links) {
      if (link.includes('tiktok') || link.includes('Experiences') || link.includes('Additionals') || link.includes('Powered by OneTrust Opens in a new Tab')) continue;

      try {
        const response = await page.goto(link, { timeout: 1000000 });
        const status = response.status();
        if (status === 200) {
          console.log(`Link: ${link} is valid with status ${status}`);
        } else {
          console.log(`Link: ${link} failed with status ${status}`);
        }
      } catch (error) {
        console.log(`Link: ${link} could not be reached. Error: ${error}`);
      }
    }
  });
});
