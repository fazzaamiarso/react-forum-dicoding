import { forumAPI, renderWithProviders } from "@/utils/test/test-utils";
import { describe, test, expect } from "vitest";
import Home from "../home";
import { screen } from "@testing-library/react";
import { server } from "@/mocks/msw/server";
import { rest } from "msw";
import { faker } from "@faker-js/faker";
import { createThreadItem } from "./utils";

const THREADS_ITEM_COUNT = 5;

// @vitest-environment jsdom
describe("Home", () => {
  test("should fetch and display threads", async () => {
    server.use(
      rest.get(forumAPI("threads"), async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.delay(),
          ctx.json({
            data: {
              threads: faker.helpers.multiple(createThreadItem, { count: THREADS_ITEM_COUNT }),
            },
          })
        );
      })
    );
    renderWithProviders(<Home />);

    // initially in loading state
    expect(screen.getByText(/Loading threads../i)).toBeInTheDocument();
    expect(screen.queryAllByTestId("thread-item").length).toEqual(0);

    // fetch has finished and render threads
    expect(await screen.findAllByTestId("thread-item")).toHaveLength(THREADS_ITEM_COUNT);
    expect(screen.queryByText(/Loading threads../i)).not.toBeInTheDocument();
  });

  test("should display error when request fails", async () => {
    server.use(
      rest.get(forumAPI("threads"), async (_req, res, ctx) => {
        return await res(ctx.status(500), ctx.delay(), ctx.json("Something went wrong!"));
      })
    );
    renderWithProviders(<Home />);

    expect(screen.getByText(/loading threads/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId("thread-item").length).toEqual(0);

    expect(await screen.findByText(/something went wrong while fetching data/i)).toBeInTheDocument();
  });
});
