import { renderWithProviders } from "@/utils/test/test-utils";
import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "@/mocks/msw/server";
import { rest } from "msw";
import { createComment, createThreadDetail } from "@/mocks/mock-data";
import ThreadDetail from "../thread/detail";
import { forumAPI } from "@/utils/constants";

// @vitest-environment jsdom
describe("Thread Detail", () => {
  const thread = createThreadDetail();
  test("should display empty state when there are no comments", async () => {
    server.use(
      rest.get(forumAPI("threads/:id"), async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.delay(),
          ctx.json({ data: { detailThread: { ...thread, comments: [] } } })
        );
      })
    );
    renderWithProviders(<ThreadDetail />, { path: "/threads/:threadId", initialPath: `/threads/${thread.id}` });

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
    expect(await screen.findByText(/there are no comments yet/i)).toBeInTheDocument();
  });

  test("should fetch and display comments", async () => {
    server.use(
      rest.get(forumAPI("threads/:id"), async (_req, res, ctx) => {
        return await res(ctx.status(200), ctx.delay(), ctx.json({ data: { detailThread: thread } }));
      })
    );
    renderWithProviders(<ThreadDetail />, { path: "/threads/:threadId", initialPath: `/threads/${thread.id}` });

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
    expect(await screen.findAllByTestId("comment-item")).toHaveLength(thread.comments.length);
  });

  test("should be able to add comment", async () => {
    server.use(
      rest.get(forumAPI("threads/:id"), async (_req, res, ctx) => {
        return await res(ctx.status(200), ctx.delay(), ctx.json({ data: { detailThread: thread } }));
      })
    );
    server.use(
      rest.post(forumAPI("threads/:id/comments"), async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.delay(),
          ctx.json({ data: { detailThread: { ...thread, comments: thread.comments.concat(createComment()) } } })
        );
      })
    );
    renderWithProviders(<ThreadDetail />, { path: "/threads/:threadId", initialPath: `/threads/${thread.id}` });

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
    expect(await screen.findAllByTestId("comment-item")).toHaveLength(thread.comments.length);
  });

  test("should display error when request is invalid", async () => {
    server.use(
      rest.get(forumAPI("threads/:id"), async (_req, res, ctx) => {
        return await res(ctx.status(500), ctx.delay(), ctx.json("Something went wrong!"));
      })
    );

    renderWithProviders(<ThreadDetail />, { path: "/threads/:threadId", initialPath: `/threads/${thread.id}` });

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
