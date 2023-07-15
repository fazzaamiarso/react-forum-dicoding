/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { renderWithProviders } from "@/utils/test-utils";
import { describe, test, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { server } from "@/mocks/msw/server";
import { rest } from "msw";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Leaderboard from "../leaderboards";
import { faker } from "@faker-js/faker";

const createLeaderboardItem = () => {
  return {
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: "",
    },
    score: faker.number.int(50),
  };
};

// @vitest-environment jsdom
describe("Leaderboard", () => {
  test("should fetch and display leaderboard", async () => {
    const routes = [
      {
        path: "/",
        element: <Leaderboard />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    server.use(
      rest.get("https://forum-api.dicoding.dev/v1/leaderboards", async (_req, res, ctx) => {
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
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("leaderboard-item")).toHaveLength(10);
    });
  });

  test("should refetch and display with fresh data", async () => {
    const user = userEvent.setup();

    const routes = [
      {
        path: "/",
        element: <Leaderboard />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    server.use(
      rest.get("https://forum-api.dicoding.dev/v1/leaderboards", async (_req, res, ctx) => {
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
    renderWithProviders(<RouterProvider router={router} />);

    let initialCustomerName: string | undefined = "";
    await waitFor(() => {
      initialCustomerName = screen.getAllByTestId("leaderboard-item-name").at(0)?.textContent;
    });

    await user.click(screen.getByRole("button", { name: /refresh/i }));
    expect(screen.getByTestId("leaderboard-loading")).toBeInTheDocument();

    const newCustomerName = (await screen.findAllByTestId("leaderboard-item-name")).at(
      0
    )?.textContent;

    expect(initialCustomerName).not.toEqual(newCustomerName);
  });

  test("should display error when request is invalid", async () => {
    const routes = [
      {
        path: "/",
        element: <Leaderboard />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    server.use(
      rest.get("https://forum-api.dicoding.dev/v1/leaderboards", async (_req, res, ctx) => {
        return await res(ctx.status(500), ctx.delay(), ctx.json("Something went wrong!"));
      })
    );
    renderWithProviders(<RouterProvider router={router} />);

    expect(await screen.findByTestId("leaderboard-error")).toBeInTheDocument();
  });
});
