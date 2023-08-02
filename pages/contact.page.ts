import { faker } from "@faker-js/faker";
import { expect, Locator, Page } from "@playwright/test";

class ContactPage {
  private page: Page;
  readonly form: Locator;
  readonly inputFields: Locator;
  readonly submitButton: Locator;
  readonly alertMessage: Locator;
  readonly contactNameInput: Locator;
  readonly contactEmailInput: Locator;
  readonly contactPhoneInput: Locator;
  readonly contactMessageTextArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator("#evf-form-277");
    this.inputFields = page.locator(".evf-field [name*=everest_forms]");
    this.submitButton = page.locator("button[type=submit]");
    this.alertMessage = page.getByRole("alert");
    this.contactNameInput = page.locator(".contact-name input");
    this.contactEmailInput = page.locator(".contact-email input");
    this.contactPhoneInput = page.locator(".contact-phone input");
    this.contactMessageTextArea = page.locator(".contact-message textarea");
  }

  async navigate(): Promise<void> {
    await this.page.goto("/contact");
  }

  async fillContactFormAndSubmit(version: boolean): Promise<void> {
    await this.form.scrollIntoViewIfNeeded();
    if (version) {
      await this.fillContactFormJpVersion();
    } else {
      await this.fillContactForm();
    }
    await this.submitForm();
  }

  async fillContactForm(): Promise<void> {
    await this.contactNameInput.fill(faker.person.fullName());
    await this.contactEmailInput.fill(faker.internet.email());
    await this.contactPhoneInput.fill(faker.phone.number());
    await this.contactMessageTextArea.fill(faker.lorem.text());
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async fillContactFormJpVersion(): Promise<void> {
    const fieldsToFill = await this.inputFields.elementHandles();
    let index = 0;
    for (const input of fieldsToFill) {
      if (index === 1) {
        const randomEmail = faker.internet.email({
          firstName: "Jeanne",
          lastName: "Doe",
        });
        await input.fill(randomEmail);
      } else if (index === 2) {
        const randomNumber = faker.phone.number("501######");
        await input.fill(randomNumber);
      } else {
        const randomText = faker.string.alpha(10);
        await input.fill(randomText);
      }
      index++;
    }
  }

  async assertMessageInAlert(message: string): Promise<void> {
    await expect(this.alertMessage).toHaveText(new RegExp(".*" + message));
  }
}

export default ContactPage;
