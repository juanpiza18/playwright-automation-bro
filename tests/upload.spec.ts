import { expect, test } from "@playwright/test";
import path from "path";
import CartPage from "../pages/cart.page";
import UploadComponent from "../pages/components/upload.component";

test.describe("Upload File", () => {
  let cartPage: CartPage;
  const fileNames = ["logo.jpg", "logo2mb.jpg"];

  test.beforeEach(({ page }) => {
    cartPage = new CartPage(page);
  });

  for (const name of fileNames) {
    test(`Should upload a test file ${name}`, async () => {
      const uploadComponent: UploadComponent = cartPage.uploadComponent();
      // Open URL
      // await page.goto("https://practice.automationbro.com/cart/");
      await cartPage.navigate();
      // Path of the file that should be uploaded store test file path
      const filePath = path.join(__dirname, `../data/${name}`);
      // upload test file
      // await page.setInputFiles("#upfile_1", filePath);
      // click submit button
      // await page.locator("#upload_1").click();
      await uploadComponent.uploadFile(filePath);
      // Wait for
      // const messageBlock = page.locator("#wfu_messageblock_header_1_1");
      await uploadComponent.successTxt.waitFor({
        state: "visible",
        timeout: 50000,
      });
      // assertion file is uploaded successfully
      await expect(uploadComponent.successTxt).toContainText(
        "uploaded successfully",
        {
          timeout: 10000,
        }
      );
    });
  }

  // eslint-disable-next-line playwright/no-skipped-test
  test.skip("Should upload a test file on a hidden input field", async ({
    page,
  }) => {
    const uploadComponent = cartPage.uploadComponent();
    // Open URL
    // await page.goto("https://practice.automationbro.com/cart/");
    await cartPage.navigate();
    // Path of the file that should be uploaded store test file path
    const filePath = path.join(__dirname, "../data/logo.jpg");
    // DOM maniulate
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    // // upload test file
    // await page.setInputFiles("#upfile_1", filePath); // Assuming this throw and error
    // // click submit button
    // await page.locator("#upload_1").click();
    await uploadComponent.uploadFile(filePath);

    // assertion file is uploaded successfully

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully"
    );
  });
});
