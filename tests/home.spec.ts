import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe("Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    // Go to Page
    // await page.goto("https://practice.automationbro.com/");
    await homePage.navigate();
  });

  test("Open Home Page and verify title", async ({ page }) => {
    // Expect assertion to be true: verify page title.
    // const title = await page.title();
    // expect(title).toBe("Practice E-Commerce Site – Automation Bro");
    await expect(page).toHaveTitle("Practice E-Commerce Site – Automation Bro");
  });
  test("Open About Page and verify Title", async ({ page }) => {
    const aboutNavButton = page.locator(".menu-item-491").first();
    await aboutNavButton.click();
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Option 2: open about page and verify title", async ({ page }) => {
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Click get started button using CSS seletors", async ({ page }) => {
    await expect(page).not.toHaveURL(/.*#get-started/);
    // Button CSS selector -> Parameter string in this case we are searching for the button id.
    await homePage.getStartedBtn.click();
    // Verify URL was redirected to get-started
    // await expect(page).toHaveURL(
    //   "https://practice.automationbro.com/#get-started"
    // );

    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible using text selector", async () => {
    // Find the text locator
    // const headingText = page.locator('text="Think different. Make different."');
    // Verify text is visible
    await expect(homePage.headingText).toBeVisible();
  });

  test("Verify home link is enabled", async () => {
    // Find de home Text
    // una vez encuentres el primary busca este texto ve al padre y despues al hijo
    // const homeText = page.locator("#zak-primary-menu >> text=Home");
    // const homeText = page.locator('#zak-primary-menu:has-text("Home")');
    await expect(homePage.homeText).toBeEnabled();
  });

  test("Verify search icon is visible using XPATH selector", async () => {
    // await page.goto("https://practice.automationbro.com/");
    // const searchIcon = page.locator(
    //   '//div[contains(@class,"zak-header-actions--desktop")]//div[contains(@class, "zak-header-search")]'
    // );
    // Search Icon is visible
    await expect(homePage.searchIcon).toBeVisible();
  });

  test("Verify the text for all nav links", async () => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    //#zak-primary-menu li[id*=menu]
    // Find the nav links
    // const navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    // what if we only one to verify one single element of the navLinks
    const blogElement = homePage.navLinks.nth(3);

    // verify nav links text
    expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
    await expect(blogElement).toHaveText("Blog");
    for (const element of await homePage.navLinks.elementHandles()) {
      console.log(await element.textContent());
    }
  });
});
