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
  // Perfom login state
  await page.locator("#username").fill("practiceuser1");
  await page.locator("#password").fill("PracticePass1!");
  await page.getByText("Log in").click();

  // Store the Signed state to a new file - save signed-in state "loggedInState.json"
  await page.context().storageState({
    path: "loggedInState.json",
  });
  await browser.close();
}

export default globalSetup;
