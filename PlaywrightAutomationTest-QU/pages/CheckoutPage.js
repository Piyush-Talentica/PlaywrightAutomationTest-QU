class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Form fields
    this.fullNameInput = 'input[name="firstname"]';
    this.emailInput = 'input[name="email"]';
    this.addressInput = 'input[name="address"]';
    this.cityInput = 'input[name="city"]';
    this.stateInput = 'input[name="state"]';
    this.zipInput = 'input[name="zip"]';
    this.cardNameInput = 'input[name="cardname"]';
    this.cardNumberInput = 'input[name="cardnumber"]';
    this.expMonthInput = 'select[name="expmonth"]';
    this.expYearInput = 'input[name="expyear"]';
    this.cvvInput = 'input[name="cvv"]';
    this.shippingCheckbox = 'input[name="sameadr"]';
    this.continueButton = 'button:has-text("Continue to checkout")';
    this.confirmationText = '#order-confirmation h1';
    this.orderID = 'p[data-id="ordernumber"]';

    // Cart Total and Product Prices
    this.cartTotal = '//*[text()="Total "]/span/b';
    this.productPriceSelector = '.price';
  }

  async navigate() {
    await this.page.goto('http://localhost:3100/checkout');
  }

  // Fill out the billing address form
  async fillBillingAddress(fullName, email, address, city, state, zip) {
    await this.page.fill(this.fullNameInput, fullName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.addressInput, address);
    await this.page.fill(this.cityInput, city);
    await this.page.fill(this.stateInput, state);
    await this.page.fill(this.zipInput, zip);
  }

  // Fill out the payment details
  async fillPaymentDetails(cardName, cardNumber, expMonth, expYear, cvv) {
    await this.page.fill(this.cardNameInput, cardName);
    await this.page.fill(this.cardNumberInput, cardNumber);
    await this.page.selectOption(this.expMonthInput, expMonth);
    await this.page.fill(this.expYearInput, expYear);
    await this.page.fill(this.cvvInput, cvv);
  }

  // Check or uncheck the "Shipping address same as billing" checkbox
  async checkShippingAddressCheckbox() {
    const isChecked = await this.page.isChecked(this.shippingCheckbox);
    if (!isChecked) {
      await this.page.check(this.shippingCheckbox);
    }
  }

  async uncheckShippingAddressCheckbox() {
    const isChecked = await this.page.isChecked(this.shippingCheckbox);
    if (isChecked) {
      await this.page.uncheck(this.shippingCheckbox);
    }
  }

  // Submit the checkout form
  async submitForm() {
    await this.page.click(this.continueButton);
  }

  // Get the cart total
  async getCartTotal() {
    const totalText = await this.page.textContent(this.cartTotal);
    return totalText.trim(); // Clean up the text content (e.g., remove unwanted spaces)
  }

  // Get all the product prices displayed on the checkout page
  async getProductPrices() {
    const prices = await this.page.locator(this.productPriceSelector);
    const priceTexts = await prices.allTextContents();
    // Convert price texts to numbers by removing the dollar sign and parsing as floats
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationText);
  }

  async getOrderID() {
    return await this.page.textContent(this.orderID);
  }
}

module.exports = CheckoutPage;
