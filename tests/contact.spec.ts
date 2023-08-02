import { test } from "@playwright/test";
import ContactPage from "../pages/contact.page";

test.describe("Contact", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
  });

  // eslint-disable-next-line playwright/expect-expect
  test("Verify Contact page filling form and success message", async ({
    page,
  }) => {
    await page.goto("https://practice.automationbro.com/");
    // Click to Contact Page
    await page
      .locator('#zak-primary-menu li[id*=menu]:has-text("Contact")')
      .click();

    await contactPage.fillContactFormAndSubmit(true);
    // fill the form with data
    // const form = page.locator("#evf-form-277");
    // await contactPage.form.scrollIntoViewIfNeeded();
    // const inputFields = await page
    //   .locator(".evf-field [name*=everest_forms]")
    //   .elementHandles();
    // let index = 0;
    // for (const input of inputFields) {
    //   if (index === 1) {
    //     const randomEmail = faker.internet.email({
    //       firstName: "Jeanne",
    //       lastName: "Doe",
    //     });
    //     await input.fill(randomEmail);
    //   } else if (index === 2) {
    //     const randomNumber = faker.phone.number("501######");
    //     await input.fill(randomNumber);
    //   } else {
    //     const randomText = faker.string.alpha(10);
    //     await input.fill(randomText);
    //   }
    //   index++;
    // }
    // Click submit and validate message
    // const submit = page.locator("button[type=submit]");
    // await submit.click();
    await page.waitForLoadState();

    // const alert = page.getByRole("alert");
    // await form.scrollIntoViewIfNeeded();
    // await expect(alert).toHaveText(/.*We were unable to process your form/);
    // await submit.click();

    // await alert.scrollIntoViewIfNeeded();
    // await expect(alert).toHaveText(/.*Thanks for contacting us!/);
    await contactPage.assertMessageInAlert("Thanks for contacting us!");
  });

  // eslint-disable-next-line playwright/expect-expect
  test("Fill contact form and verify success message teacher example", async () => {
    await contactPage.navigate();
    await contactPage.fillContactFormAndSubmit(false);
    await contactPage.assertMessageInAlert("Thanks for contacting us!");
    // await page.pause();
    // await page.goto("https://practice.automationbro.com/contact");
    // await page.locator(".contact-name input").fill("Test Name");
    // await page.locator(".contact-email input").fill("test@gmail.com");
    // await page.locator(".contact-phone input").fill("123456789");
    // await page
    //   .locator(".contact-message textarea")
    //   .fill("This is a test message");
    // add a soft assertion
    // await expect
    //   .soft(page.locator(".contact-message textarea"))
    //   .toHaveText("Fail test message");
    // await page.locator("button[type=submit]").click();

    // expect(test.info().errors?.length).toBeLessThan(1);
    // It doesnt work sam eissue I was having so we need the workaround to fix it
    // await expect(page.getByRole("alert")).toHaveText(
    //   /.*Thanks for contacting us!/
    // );
  });
});
