import { UserAvatar } from "@/components/user-avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/UserAvatar",
  component: UserAvatar,
  tags: ["autodocs"],
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: { size: "lg", imgSrc: "https://api.dicebear.com/6.x/adventurer-neutral/svg" },
};
export const Medium: Story = {
  args: { size: "md", imgSrc: "https://api.dicebear.com/6.x/adventurer-neutral/svg" },
};
export const Small: Story = {
  args: { size: "sm", imgSrc: "https://api.dicebear.com/6.x/adventurer-neutral/svg" },
};
