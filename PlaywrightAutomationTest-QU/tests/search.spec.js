const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/searchPage');
const testData = require('../resources/testDataSearchPage.json');

test.describe('Search Tests', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.navigate();
  });

  test('Search Success', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigate();

    for (const word of testData.searchWords) {
      // Perform the search
      await searchPage.searchForWord(word);

      // Wait for the "Searching..." message to disappear
      await searchPage.waitForSearchComplete();

      // Assert that the search result message contains the expected word without quotes
      const searchResultMessage = await searchPage.getSearchResultMessage();
      expect(searchResultMessage).toContain(testData.resultMessage+word);
    }
  });

  test('Search Empty', async ({ page }) => {

    // Perform search with an empty query
    await searchPage.searchForWord('');

    // Wait for the "Searching..." message to disappear
    await searchPage.waitForSearchComplete();

    // Assert that the correct error message is displayed
    const errorMessage = await searchPage.getErrorMessage();
    expect(errorMessage).toBe(testData.emptySearchErrorMessage);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

});
