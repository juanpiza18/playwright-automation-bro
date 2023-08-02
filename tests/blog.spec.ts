/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";
import BlogPage from "../pages/blog.page";
test.describe("Blog", () => {
  let blogPage: BlogPage;
  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
  });

  test("Verify Blog page recent post", async ({ page }) => {
    await page.goto("https://practice.automationbro.com/");
    // Click to Contact Page
    await page
      .locator('#zak-primary-menu li[id*=menu]:has-text("Blog")')
      .click();

    // const recentPost = await page
    //   .locator("#recent-posts-3 ul li")
    //   .elementHandles();
    // for (const post of recentPost) {
    //   expect((await post.textContent())?.trim()?.length).toBeGreaterThan(10);
    // }
    // expect(recentPost.length).toBeGreaterThan(5);
    await blogPage.assertRecentPostLengthGreaterThan(10);
    await blogPage.assertRecentPostLength(5);
  });
  test("Verify recent post count and verify the length of each list item - Teacher", async () => {
    await blogPage.navigate();
    await blogPage.assertRecentPostLengthGreaterThan(10);
    await blogPage.assertRecentPostLength(5);
    // await page.goto("https://practice.automationbro.com/blog");
    // const recentPost = page.locator("#recent-posts-3 ul li");
    // const recentPostList = await recentPost.elementHandles();
    // for (const recentPost of recentPostList) {
    //   expect((await recentPost.textContent())?.trim()?.length).toBeGreaterThan(
    //     10
    //   );
    // }
    // expect(await recentPost.count()).toEqual(5);
  });
});
