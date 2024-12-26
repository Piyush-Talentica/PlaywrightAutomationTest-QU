class GridPage {
  constructor(page) {
    this.page = page;
    this.gridItemSelector = 'div.item'; // selector for each item in the grid
  }

  async navigate() {
    await this.page.goto('http://localhost:3100/grid');
  }

  // Get the title of an item based on its position
  async getItemTitle(position) {
    const item = this.page.locator(`${this.gridItemSelector}:nth-child(${position}) h4[data-test-id="item-name"]`);
    return await item.textContent();
  }

  // Get the price of an item based on its position
  async getItemPrice(position) {
    const item = this.page.locator(`${this.gridItemSelector}:nth-child(${position}) #item-price`);
    return await item.textContent();
  }

  // Get the total number of grid items
  async getGridItemsCount() {
    return await this.page.locator(this.gridItemSelector).count();
  }

  // Check if the title of an item is visible at the given position
  async isTitleVisible(index) {
    const title = this.page.locator(`${this.gridItemSelector}:nth-child(${index}) h4[data-test-id="item-name"]`);
    return await title.isVisible();
  }

  // Check if the price of an item is visible at the given position
  async isPriceVisible(index) {
    const price = this.page.locator(`${this.gridItemSelector}:nth-child(${index}) #item-price`);
    return await price.isVisible();
  }

  // Check if the image of an item is visible at the given position
  async isImageVisible(index) {
    const image = this.page.locator(`${this.gridItemSelector}:nth-child(${index}) img`);
    return await image.isVisible();
  }

  // Check if the "Add to Order" button of an item is visible at the given position
  async isButtonVisible(index) {
    const button = this.page.locator(`${this.gridItemSelector}:nth-child(${index}) button[data-test-id="add-to-order"]`);
    return await button.isVisible();
  }
}

module.exports = GridPage;
