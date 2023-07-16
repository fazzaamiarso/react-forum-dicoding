import { forumAPI, renderWithProviders } from "@/utils/test/test-utils";
import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "@/mocks/msw/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import Leaderboard from "../leaderboards";
import { faker } from "@faker-js/faker";
import { createLeaderboardItem } from "./utils";

// @vitest-environment jsdom
describe("Leaderboard", () => {
  const errorStateRegex = /something went wrong when fetching your data! Please try again by refreshing/i;
  const loadingStateRegex = /loading leaderboard/i;

  test("should fetch and display leaderboard", async () => {
    server.use(
      rest.get(forumAPI("leaderboards"), async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.delay(),
          ctx.json({
            data: { leaderboards: faker.helpers.multiple(createLeaderboardItem, { count: 10 }) },
          })
        );
      })
    );
    renderWithProviders(<Leaderboard />);

    expect(screen.getByText(loadingStateRegex)).toBeInTheDocument();
    expect(await screen.findAllByTestId("leaderboard-item")).toHaveLength(10);
  });

  test("should refetch and display fresh data", async () => {
    const user = userEvent.setup();

    server.use(
      rest.get(forumAPI("leaderboards"), async (_req, res, ctx) => {
        return await res(
          ctx.status(200),
          ctx.delay(),
          ctx.json({
            data: {
              leaderboards: faker.helpers.multiple(createLeaderboardItem, { count: 10 }),
            },
          })
        );
      })
    );

    renderWithProviders(<Leaderboard />);
    expect(screen.getByText(loadingStateRegex)).toBeInTheDocument();

    const initialCustomerName = (await screen.findAllByTestId("leaderboard-item-name")).at(0)?.textContent;

    await user.click(screen.getByRole("button", { name: /refresh/i }));
    expect(screen.getByText(loadingStateRegex)).toBeInTheDocument();

    const newCustomerName = (await screen.findAllByTestId("leaderboard-item-name")).at(0)?.textContent;

    expect(initialCustomerName).not.toEqual(newCustomerName);
  });

  test("should display error when request is invalid", async () => {
    server.use(
      rest.get(forumAPI("leaderboards"), async (_req, res, ctx) => {
        return await res(ctx.status(500), ctx.delay(), ctx.json("Something went wrong!"));
      })
    );
    renderWithProviders(<Leaderboard />);

    expect(screen.getByText(loadingStateRegex)).toBeInTheDocument();
    expect(await screen.findByText(errorStateRegex)).toBeInTheDocument();
  });
});
