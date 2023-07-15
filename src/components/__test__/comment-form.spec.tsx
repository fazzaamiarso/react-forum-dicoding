import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CommentForm from "../thread-detail/comment-form";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

const mockSubmit = vi.fn();

const formData = {
  id: faker.string.uuid(),
  content: faker.lorem.sentence(),
};

// @vitest-environment jsdom
describe("Comment Form", () => {
  test("should display matching error when content is invalid", async () => {
    const user = userEvent.setup();
    render(<CommentForm threadId={formData.id} onSubmit={mockSubmit} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).not.toBeCalled();
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  test("should submit with the expected data and reset form field", async () => {
    const user = userEvent.setup();
    render(<CommentForm threadId={formData.id} onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/add comment/i), formData.content);
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({ threadId: formData.id, content: formData.content });
    expect(screen.getByLabelText(/add comment/i)).toHaveValue("");
  });
});
