import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { RegisterForm } from "../auth/register";

const mockOnSubmit = vi.fn(async () => {
  await Promise.resolve();
});

const credentials = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 }),
};

// @vitest-environment jsdom
describe("Register Form", () => {
  test("should display required error when value is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: /register/i }));
    expect(mockOnSubmit).to.not.toBeCalled();
    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });

  test("should display matching error when name is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), credentials.email);
    await user.type(screen.getByLabelText("Password"), credentials.password);

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockOnSubmit).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(credentials.email);
    expect(screen.getByLabelText("Password")).toHaveValue(credentials.password);
  });

  test("should display matching error when email is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), "test");
    await user.type(screen.getByLabelText("Password"), credentials.password);
    await user.type(screen.getByRole("textbox", { name: /name/i }), credentials.name);

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockOnSubmit).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(credentials.name);
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue("test");
    expect(screen.getByLabelText("Password")).toHaveValue(credentials.password);
  });

  test("should display matching error when password is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /email/i }), credentials.email);
    await user.type(screen.getByRole("textbox", { name: /name/i }), credentials.name);
    await user.type(screen.getByLabelText("Password"), "pass");

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockOnSubmit).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(credentials.name);
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(credentials.email);
    expect(screen.getByLabelText("Password")).toHaveValue("pass");
  });

  test("should not display error when value is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByRole("textbox", { name: /name/i }), credentials.name);
    await user.type(screen.getByRole("textbox", { name: /email/i }), credentials.email);
    await user.type(screen.getByLabelText("Password"), credentials.password);

    await user.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(credentials.name);
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(credentials.email);
    expect(screen.getByLabelText("Password")).toHaveValue(credentials.password);
  });
});
