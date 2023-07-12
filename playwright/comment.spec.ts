import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Comment", () => {
  test.only("Add comment", async ({ page }) => {
    const threads = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    await page.route("https://forum-api.dicoding.dev/v1/threads", (route) => {
      route.fulfill({ json: { data: { threads } } });
    });

    await page.goto("/");

    const threadLink = page.getByTestId("thread-link").first();
    const threadHref = await threadLink.getAttribute("href");
    await threadLink.click();
    await page.waitForURL(threadHref ?? "");

    const initialCommentCount = await page.getByTestId("comment-item").count();

    await page.getByLabel("Add Comment").fill(faker.lorem.text());
    await page.getByRole("button", { name: /submit/i }).click();
    await page.waitForLoadState("networkidle");

    expect(await page.getByTestId("comment-item").count()).toEqual(initialCommentCount + 1);
  });
});
