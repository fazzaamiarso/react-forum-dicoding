import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TextField from "../text-field";

// @vitest-environment jsdom
describe("Text Field", () => {
  test("don't render description when no description provided", async () => {
    render(<TextField label="Test field" name="test-field" />);
    expect(screen.queryByTestId("test-field-description")).not.toBeInTheDocument();
  });
  test("render description when description provided", async () => {
    render(<TextField label="Test field" name="test-field" description="a random description" />);
    expect(screen.getByTestId("test-field-description")).toHaveTextContent("a random description");
  });
});
