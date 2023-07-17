import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { faker } from "@faker-js/faker";
import LoginForm from "../auth/login-form";

const mockOnSubmit = vi.fn();

const credentials = {
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 }),
};

// @vitest-environment jsdom
describe("Login Form", () => {
  test("should display required error when value is invalid", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(mockOnSubmit).to.not.toBeCalled();
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });

  test("should display matching error when email is invalid", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), "test");
    await user.type(screen.getByLabelText("Password"), credentials.password);

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockOnSubmit).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue("test");
    expect(screen.getByLabelText("Password")).toHaveValue(credentials.password);
  });

  test("should display matching error when password is invalid", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), credentials.email);
    await user.type(screen.getByLabelText("Password"), "pass");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockOnSubmit).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(credentials.email);
    expect(screen.getByLabelText("Password")).toHaveValue("pass");
  });

  test("should not display error when value is invalid", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), credentials.email);
    await user.type(screen.getByLabelText("Password"), credentials.password);

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(credentials.email);
    expect(screen.getByLabelText("Password")).toHaveValue(credentials.password);
  });
});
