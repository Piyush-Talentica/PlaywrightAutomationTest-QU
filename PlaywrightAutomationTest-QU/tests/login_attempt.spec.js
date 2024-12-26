const {
  test,
  expect
} = require('@playwright/test');
const LoginPage = require("../pages/LoginPage"); // Adjust the path as necessary
const testData = require("../resources/testDataLoginPage.json"); // Import test data

test.describe('Login Page Tests with Resource Data', () => {
  let loginPage;

  test.beforeEach(async ({
    page
  }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login Success', async ({
    page
  }) => {

    // Extract valid user data
    const validUser = testData.loginData.find(data => data.role === "validUserRole");
    await loginPage.login(validUser.username, validUser.password);

    const welcomeMessage = await loginPage.getWelcomeMessageText();
    expect(welcomeMessage).toContain(validUser.expectedMessage); // Assert welcome message
  });

  test('Login Failure - Invalid Credentials', async ({
    page
  }) => {

    // Extract invalid user data
    const invalidUser = testData.loginData.find(data => data.role === "invalidUserRole");

    await loginPage.login(invalidUser.username, invalidUser.password);

    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).toContain(invalidUser.expectedMessage); // Assert error message
  });

  test('Login Failure - Blank Fields', async ({
    page
  }) => {

    // Extract blank fields data
    const blankFields = testData.loginData.find(data => data.role === "EmptyUserRole");

    await loginPage.login(blankFields.username, blankFields.password);

    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).toContain(blankFields.expectedMessage); // Assert error message
  });

  test.afterEach(async ({
    page
  }) => {
    await page.close();
  });

});