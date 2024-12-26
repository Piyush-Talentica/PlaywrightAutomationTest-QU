const { test, expect } = require('@playwright/test');
const GridPage = require('../pages/GridPage');
const testData = require('../resources/testDataGridPage.json');

test.describe('Grid Page Tests with Resource Data', () => {
  let gridPage;

  test.beforeEach(async ({ page }) => {
    gridPage = new GridPage(page);
    await gridPage.navigate();
  });

  test('Assert product in position 7 using resource data', async () => {
    const item = testData.gridItems.find(item => item.position === 7);
    const title = await gridPage.getItemTitle(item.position);
    expect(title.trim()).toBe(item.title);

    const price = await gridPage.getItemPrice(item.position);
    expect(price.trim()).toBe(item.price);
  });

  test('Assert all grid items have required properties using resource data', async () => {
    for (const item of testData.gridItems) {
      const title = await gridPage.getItemTitle(item.position);
      expect(title.trim()).toBe(item.title);

      const price = await gridPage.getItemPrice(item.position);
      expect(price.trim()).toBe(item.price);
    }
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
