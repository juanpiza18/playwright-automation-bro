import { Locator, Page } from "@playwright/test";

class UploadComponent {
  private page: Page;
  readonly uploadFieldSelector: string;
  readonly uploadInputFieldSelector: string;
  readonly submitBtn: Locator;
  readonly successTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadFieldSelector = "#upfile_1";
    this.uploadInputFieldSelector = "input#upfile_1";
    this.submitBtn = page.locator("#upload_1");
    this.successTxt = page.locator("#wfu_messageblock_header_1_1");
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles(this.uploadFieldSelector, filePath);
    await this.submitBtn.click();
  }
}

export default UploadComponent;
