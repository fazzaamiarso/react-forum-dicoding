import { VoteButton } from "@/components/vote-button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/VoteButton",
  component: VoteButton,
  tags: ["autodocs"],
} satisfies Meta<typeof VoteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upvoted: Story = {
  args: {
    hasUpvoted: true,
    hasDownvoted: false,
    downVotes: 0,
    upVotes: 0,
    updateVote: async () => {},
  },
};
