import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Thread", () => {
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

  test.skip("Vote Thread", async ({ page }) => {
    await page.goto("/");
    const initialVote = Number(await page.getByTestId("vote-count").first().innerText());
    // upvote
    const upVotePromise = page.waitForResponse((response) => response.url().includes("up-vote"));
    await page.getByTestId("upvote").first().click();
    await upVotePromise;
    await page.waitForTimeout(300);
    expect(Number(await page.getByTestId("vote-count").first().innerText())).toBeGreaterThan(
      initialVote
    );

    // neutralize vote
    const neutralVotePromise = page.waitForResponse((response) =>
      response.url().includes("neutral-vote")
    );
    await page.getByTestId("upvote").first().click();
    await neutralVotePromise;
    await page.waitForTimeout(300);

    expect(Number(await page.getByTestId("vote-count").first().innerText())).toEqual(initialVote);

    // downvote
    const downVotePromise = page.waitForResponse((response) =>
      response.url().includes("down-vote")
    );
    await page.getByTestId("downvote").first().click();
    await downVotePromise;
    await page.waitForTimeout(300);

    expect(Number(await page.getByTestId("vote-count").first().innerText())).toBeLessThan(
      initialVote
    );
  });
});
