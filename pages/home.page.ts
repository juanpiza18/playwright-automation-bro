import { Locator, Page } from "@playwright/test";

class HomePage {
  readonly page: Page;
  readonly getStartedBtn: Locator;
  readonly headingText: Locator;
  readonly homeText: Locator;
  readonly searchIcon: Locator;
  readonly navLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedBtn = page.locator("#get-started");
    this.headingText = page.getByText("Think different. Make different.");
    this.homeText = page.locator('#zak-primary-menu:has-text("Home")');
    this.searchIcon = page.locator(
      '//div[contains(@class,"zak-header-actions--desktop")]//div[contains(@class, "zak-header-search")]'
    );
    this.navLinks = page.locator("#zak-primary-menu li[id*=menu]");
  }

  async navigate(): Promise<void> {
    await this.page.goto("/");
  }

  async getNavLinksText(): Promise<string[]> {
    return await this.navLinks.allInnerTexts();
  }
}

export default HomePage;
