import NotFound from "@/routes/404";
import type { Meta, StoryObj } from "@storybook/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const meta = {
  title: "Components/404",
  component: NotFound,
  tags: ["autodocs"],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const routes = [{ path: "/", element: <NotFound /> }];
    const router = createMemoryRouter(routes, { initialIndex: 0, initialEntries: ["/"] });
    return <RouterProvider router={router} />;
  },
};
