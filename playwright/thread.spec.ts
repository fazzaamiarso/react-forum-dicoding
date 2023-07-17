import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createThreadItem } from "../src/mocks/mock-data";
import { forumAPI } from "../src/utils/constants";

test.describe("Thread", () => {
  const threadData = createThreadItem();
  const threads = faker.helpers.multiple(createThreadItem, { count: 5 });

  test("should create thread", async ({ page }) => {
    await page.route(forumAPI("threads"), async (route, req) => {
      if (req.method() === "GET") return route.fulfill({ json: { data: { threads } } });
      if (req.method() === "POST") {
        threads.unshift(threadData);
        return route.fulfill({});
      }
    });

    await page.goto("/");

    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("menuitem", { name: /create thread/i }).click();

    await expect(page).toHaveURL("/threads/new");

    await page.getByLabel(/title/i).fill(threadData.title);
    await page.getByLabel(/category/i).fill(threadData.category);
    await page.getByLabel(/content/i).fill(threadData.body);
    await page.getByRole("button", { name: "Add Thread" }).click();

    await expect(page).toHaveURL("/");

    await expect(page.getByTestId("thread-link").first()).toContainText(threadData.title);
    await expect(page.getByTestId("thread-category").first()).toContainText(threadData.category);
  });
});
