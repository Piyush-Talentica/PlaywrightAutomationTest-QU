class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.signInButton = 'button:has-text("Sign In")';
    this.welcomeMessageXPath = '//*[@id="welcome-message"]/h2';
    this.errorMessageXPath = '//*[@id="message"]'
  }

  async navigate() {
    await this.page.goto('http://localhost:3100/login');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signInButton);
  }

  async getWelcomeMessageText() {
    return await this.page.locator(this.welcomeMessageXPath).textContent();
  }

  async getErrorMessageText() {
    return await this.page.locator(this.errorMessageXPath).textContent();
  }
}

module.exports = LoginPage;
