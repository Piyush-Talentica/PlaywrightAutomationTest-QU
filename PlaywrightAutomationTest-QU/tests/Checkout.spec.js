const {
  test,
  expect
} = require('@playwright/test');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../resources/testDataCheckoutPage.json');

test.describe('Checkout Form Tests', () => {
  let checkoutPage;

  test.beforeEach(async ({
    page
  }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.navigate();
  });

  test('Checkout Form Order Success', async ({
    page
  }) => {

    // Assert that order confirmation number is not empty
    const confirmationNumber = await checkoutPage.getCartTotal();
    expect(confirmationNumber).not.toBeNull();
    expect(confirmationNumber).not.toBe('');

    // Fill out billing address using test data
    const billing = testData.checkoutFormData.billingAddress;
    await checkoutPage.fillBillingAddress(
      billing.fullName,
      billing.email,
      billing.address,
      billing.city,
      billing.state,
      billing.zip
    );

    // Fill out payment details using test data
    const payment = testData.checkoutFormData.payment;
    await checkoutPage.fillPaymentDetails(
      payment.nameOnCard,
      payment.creditCardNumber,
      payment.expMonth,
      payment.expYear,
      payment.cvv
    );

    // Verify and toggle "Shipping address same as billing" checkbox
    await checkoutPage.checkShippingAddressCheckbox();

    // Submit the form
    await checkoutPage.submitForm();

    const confirmationMessage = await checkoutPage.getConfirmationMessage();
    expect(confirmationMessage).toContain(testData.orderConfirmationMessage);

    const orderIDNumber = await checkoutPage.getOrderID();
    expect(orderIDNumber).not.toBeNull();
    expect(orderIDNumber).not.toBe(testData.emptyErrorOrderNumberMessage);
    expect(orderIDNumber).toContain(testData.orderNumberConfirmationMessage);
  });

  test('Checkout Form Alert', async ({
    page
  }) => {

    // Fill out billing address using test data
    const billing = testData.checkoutFormData.billingAddress;
    await checkoutPage.fillBillingAddress(
      billing.fullName,
      billing.email,
      billing.address,
      billing.city,
      billing.state,
      billing.zip
    );

    // Fill out payment details using test data
    const payment = testData.checkoutFormData.payment;
    await checkoutPage.fillPaymentDetails(
      payment.nameOnCard,
      payment.creditCardNumber,
      payment.expMonth,
      payment.expYear,
      payment.cvv
    );

    // Verify and toggle "Shipping address same as billing" checkbox
    await checkoutPage.uncheckShippingAddressCheckbox();

    // Try to submit the form without checking the checkbox
    await checkoutPage.submitForm();

    // Wait for and confirm alert message
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain(testData.shippingAddressMessage);
      await dialog.accept();
    });
  });

  test('Cart Total Test', async ({
    page
  }) => {

    // Get the prices of all products listed on the checkout page
    const productPrices = await page.$$eval('span.price', priceElements =>
      priceElements.map(priceElement =>
        parseFloat(priceElement.innerText.replace('$', '').trim()) // Convert price text to float
      )
    );

    // Extract the first element as cart_total_count (cart number) and last element as cart_actual_total
    const cart_total_count = productPrices[0];
    const cart_actual_total = productPrices[productPrices.length - 1];

    // Remove the first and last elements (cart number and total price)
    const filteredPrices = productPrices.slice(1, -1);

    // Calculate the expected total from the filtered prices
    const expectedTotal = filteredPrices.reduce((sum, price) => sum + price, 0);

    // Assert that the cart total is correct
    const cartTotalText = await checkoutPage.getCartTotal();
    const cartTotal = parseFloat(cartTotalText.replace('$', '').trim());

    // Compare the actual total with the expected total
    expect(cartTotal).toBe(cart_actual_total);

    // Verify that the cart number (the number of products) matches the length of filteredPrices
    expect(filteredPrices.length).toBe(cart_total_count);
  });

  test.afterEach(async ({
    page
  }) => {
    await page.close();
  });

});
