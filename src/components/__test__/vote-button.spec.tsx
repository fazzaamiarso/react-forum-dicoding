import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { VoteButton } from "../vote-button";

const mockUpdateVote = vi.fn();

const defaultProps = {
  downVotes: 0,
  upVotes: 0,
  hasDownvoted: false,
  hasUpvoted: false,
  updateVote: mockUpdateVote,
};

// @vitest-environment jsdom
describe("Vote Button", () => {
  test("should display correct vote count", async () => {
    render(<VoteButton {...defaultProps} downVotes={3} upVotes={5} />);
    expect(screen.getByTestId("vote-count")).toHaveTextContent("2");
  });

  test("should be able to upvote", async () => {
    const user = userEvent.setup();
    render(<VoteButton {...defaultProps} />);

    await user.click(screen.getByTestId("upvote"));
    expect(mockUpdateVote).toHaveBeenCalledWith("up-vote");
  });

  test("should be able to downvote", async () => {
    const user = userEvent.setup();
    render(<VoteButton {...defaultProps} />);

    await user.click(screen.getByTestId("downvote"));
    expect(mockUpdateVote).toHaveBeenCalledWith("down-vote");
  });

  test("should neutralize vote when upvoted", async () => {
    const user = userEvent.setup();
    render(<VoteButton {...defaultProps} hasUpvoted />);

    await user.click(screen.getByTestId("upvote"));
    expect(mockUpdateVote).toHaveBeenCalledWith("neutral-vote");
  });

  test("should neutralize vote when downvoted", async () => {
    const user = userEvent.setup();
    render(<VoteButton {...defaultProps} hasDownvoted />);

    await user.click(screen.getByTestId("downvote"));
    expect(mockUpdateVote).toHaveBeenCalledWith("neutral-vote");
  });

  test("should not be able to downvote when upvoted", async () => {
    render(<VoteButton {...defaultProps} hasUpvoted />);
    expect(screen.getByTestId("upvote")).toBeEnabled();
    expect(screen.getByTestId("downvote")).toBeDisabled();
  });

  test("should not be able to upvote when downvoted", async () => {
    render(<VoteButton {...defaultProps} hasDownvoted />);
    expect(screen.getByTestId("upvote")).toBeDisabled();
    expect(screen.getByTestId("downvote")).toBeEnabled();
  });
});
