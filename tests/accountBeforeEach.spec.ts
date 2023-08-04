import { expect, test } from "@playwright/test";

test.describe.serial("My Account", () => {
  test.use({
    storageState: "notLoggedInState.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-account");
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
      timeout: 30000,
    });
    await expect(logout).toBeVisible();
  });

  test("Access Orders", async ({ page }) => {
    await page.locator("li a[href*='orders']").click();
    await expect(page).toHaveURL(/.*orders/);
  });

  test("Access Downloads", async ({ page }) => {
    await page.locator("li a[href*='downloads']").click();
    await expect(page).toHaveURL(/.*downloads/);
  });
});
