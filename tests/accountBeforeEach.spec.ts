import { expect, test } from "@playwright/test";

test.describe("My Account", () => {
  test.use({
    storageState: "notLoggedInState.json",
  });
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-account");
    await page.locator("#username").fill("practiceuser1");
    await page.locator("#password").fill("PracticePass1!");
    await page.getByText("Log in").click();
    await page.waitForLoadState("load");
    await expect(page.locator("li a[href*='orders']")).toBeVisible();
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
