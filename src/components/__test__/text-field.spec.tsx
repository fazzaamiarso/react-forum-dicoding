import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TextField from "../text-field";

// @vitest-environment jsdom
describe("Text Field", () => {
  test("don't display description when no description provided", async () => {
    render(<TextField label="Test field" name="test-field" />);
    expect(screen.queryByTestId("test-field-description")).not.toBeInTheDocument();
  });
  test("display description when description provided", async () => {
    render(<TextField label="Test field" name="test-field" description="a random description" />);
    expect(screen.getByTestId("test-field-description")).toHaveTextContent("a random description");
  });
  test("don't display error when no error provided", async () => {
    render(<TextField label="Test field" name="test-field" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  test("display error when error provided", async () => {
    render(<TextField label="Test field" name="test-field" error="An error occured" />);
    expect(screen.queryByRole("alert")).toHaveTextContent("An error occured");
  });
});
