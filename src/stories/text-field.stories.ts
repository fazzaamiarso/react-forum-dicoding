import TextField from "@/components/text-field";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Username", name: "username" },
};

export const WithDescription: Story = {
  args: { ...Default.args, description: "Choose a username that represents you best" },
};

export const Placeholder: Story = {
  args: { ...Default.args, placeholder: "Type something..." },
};

export const Error: Story = {
  args: { ...Default.args, error: "Username can't be empty" },
};

export const Focus: Story = {
  args: { ...Default.args },
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    canvas.getByLabelText(args.label).focus();
  },
};
