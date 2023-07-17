import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createComment, createThreadDetail } from "../src/mocks/mock-data";
import { forumAPI } from "../src/utils/constants";

test.describe("Comment", () => {
  test("should add comment", async ({ page }) => {
    const threadDetail = createThreadDetail();

    await page.route(forumAPI("threads/**"), (route, req) => {
      if (req.method() === "GET") return route.fulfill({ json: { data: { detailThread: threadDetail } } });
    });

    await page.route(forumAPI("threads/**/comments"), (route) => {
      threadDetail.comments.unshift(createComment());
      return route.fulfill();
    });

    await page.goto(`/threads/${threadDetail.id}`);

    await page.getByTestId("loading-state").waitFor({ state: "hidden" });

    const initialCommentCount = await page.getByTestId("comment-item").count();

    await page.getByLabel("Add Comment").fill(faker.lorem.text());
    await page.getByRole("button", { name: /submit/i }).click();

    await page.reload();

    expect(await page.getByTestId("comment-item").count()).toEqual(initialCommentCount + 1);
  });
});
