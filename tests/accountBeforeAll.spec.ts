import { expect, Page, test } from "@playwright/test";

test.describe.serial("My Account", () => {
  test.use({
    storageState: "notLoggedInState.json",
  });
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/my-account");
    // Perform Login
    await page.locator("#username").fill("practiceuser1");
    await page.locator("#password").fill("PracticePass1!");
    const submitButton = page.locator(
      '//button[@type="submit" and contains(@class, "login__submit")]'
    );
    await submitButton.click();
    // // eslint-disable-next-line playwright/no-wait-for-timeout
    // await page.waitForTimeout(5000);

    if (await submitButton.isVisible()) {
      await page.locator("#username").fill("practiceuser1");
      await page.locator("#password").fill("PracticePass1!");
      const submitButton = page.locator(
        '//button[@type="submit" and contains(@class, "login__submit")]'
      );
      await submitButton.click();
    }

    const logout = page.locator('//a[contains(@href, "logout")]').first();
    await logout.waitFor({
      state: "visible",
      timeout: 15000,
    });
    await expect(logout).toBeVisible();
  });

  test("Access Orders", async () => {
    await page.locator("li a[href*='orders']").click();
    await expect(page).toHaveURL(/.*orders/);
  });

  test("Access Downloads", async () => {
    await page.locator("li a[href*='downloads']").click();
    await expect(page).toHaveURL(/.*downloads/);
  });
});
