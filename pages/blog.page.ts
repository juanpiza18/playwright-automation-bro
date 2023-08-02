import { ElementHandle, expect, Locator, Page } from "@playwright/test";

class BlogPage {
  private page: Page;
  readonly recentPostsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recentPostsList = page.locator("#recent-posts-3 ul li");
  }

  async navigate(): Promise<void> {
    await this.page.goto("/blog");
  }

  async getRecentPosts(): Promise<ElementHandle<Node>[]> {
    return await this.recentPostsList.elementHandles();
  }

  async assertRecentPostLengthGreaterThan(num: number): Promise<void> {
    const recentPost = await this.getRecentPosts();
    for (const post of recentPost) {
      expect((await post.textContent())!.trim().length).toBeGreaterThan(num);
    }
  }

  async assertRecentPostLength(num: number): Promise<void> {
    expect(await this.recentPostsList.count()).toEqual(num);
  }
}

export default BlogPage;
