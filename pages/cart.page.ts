import { Page } from "@playwright/test";
import UploadComponent from "./components/upload.component";

class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto("/cart");
  }
  uploadComponent(): UploadComponent {
    return new UploadComponent(this.page);
  }
}

export default CartPage;
