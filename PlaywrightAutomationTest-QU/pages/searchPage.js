class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = 'input[placeholder="Search.."]';
    this.searchButton = 'button[type="submit"]';
    this.searchingMessage = 'text=Searching...';
    this.searchResultMessage = 'p[id="result"]';
    this.errorMessage = 'p[id="result"]';
  }

  async navigate() {
    await this.page.goto('http://localhost:3100/search');
  }

  async searchForWord(word) {
    await this.page.fill(this.searchInput, word);
    await this.page.click(this.searchButton);
  }

  async waitForSearchComplete() {
    // Wait for the "Searching..." message to appear and then disappear
    await this.page.waitForSelector(this.searchingMessage, {
      state: 'visible'
    });
    await this.page.waitForSelector(this.searchingMessage, {
      state: 'hidden'
    });
  }

  async getSearchResultMessage() {
    return await this.page.textContent(this.searchResultMessage);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

module.exports = SearchPage;