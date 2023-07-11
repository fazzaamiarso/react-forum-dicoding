import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Create Thread", async ({ page }) => {
  const threadData = {
    title: faker.lorem.sentence({ max: 3, min: 2 }),
    category: faker.company.buzzNoun(),
    body: faker.lorem.text(),
  };
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
