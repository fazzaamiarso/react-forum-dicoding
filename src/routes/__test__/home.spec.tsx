import { renderWithProviders } from "@/utils/test-utils";
import { describe, test, expect } from "vitest";
import Home from "../home";
import { screen, waitFor } from "@testing-library/react";
import { server } from "@/mocks/msw/server";
import { rest } from "msw";

// @vitest-environment jsdom
describe("Home", () => {
  test("should fetch and display threads", async () => {
    server.use(
      rest.get("https://forum-api.dicoding.dev/v1/threads", async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.delay(),
          ctx.json({
            data: {
              threads: [
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
                {
                  id: "thread-2",
                  title: "Thread Pertama",
                  body: "Ini adalah thread pertama",
                  category: "General",
                  createdAt: "2021-06-21T07:00:00.000Z",
                  ownerId: "users-1",
                  upVotesBy: [],
                  downVotesBy: [],
                  totalComments: 0,
                },
              ],
            },
          })
        );
      })
    );
    renderWithProviders(<Home />);

    expect(screen.getByText(/Loading threads../i)).toBeInTheDocument();
    expect(screen.queryAllByTestId("thread-item").length).toEqual(0);

    await waitFor(async () => {
      expect(screen.getAllByTestId("thread-item")).toHaveLength(2);
      expect(screen.queryByText(/Loading threads../i)).not.toBeInTheDocument();
    });
  });

  test("should display error when request fails", async () => {
    server.use(
      rest.get("https://forum-api.dicoding.dev/v1/threads", async (_req, res, ctx) => {
        return await res(ctx.status(500), ctx.delay(), ctx.json("Something went wrong!"));
      })
    );
    renderWithProviders(<Home />);

    expect(screen.getByText(/loading threads/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId("thread-item").length).toEqual(0);

    await waitFor(async () => {
      expect(screen.queryByText(/something went wrong while fetching data/i)).toBeInTheDocument();
    });
  });
});
