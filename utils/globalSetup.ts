import { chromium } from "@playwright/test";

/*
 * Parameter Opcional that we can add to the function config: FullConfig
 */
async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // Login
  await page.goto("https://practice.automationbro.com/my-account");
  // Create a new login state without cookies
  await page.context().storageState({
    path: "notLoggedInState.json",
  });
  // Perform Login
  await page.locator("#username").fill("practiceuser1");
  await page.locator("#password").fill("PracticePass1!");
  const submitButton = page.locator(
    '//button[@type="submit" and contains(@class, "login__submit")]'
  );
  await submitButton.click();
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

  // Store the Signed state to a new file - save signed-in state "loggedInState.json"
  await page.context().storageState({
    path: "loggedInState.json",
  });
  await browser.close();
}

export default globalSetup;
