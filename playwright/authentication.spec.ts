import { test, expect } from "@playwright/test";

const credentials = {
  email: process.env.TEST_EMAIL ?? "",
  password: process.env.TEST_PASSWORD ?? "",
};

test.describe("Authentication Page", () => {
  test("Login, then Logout successfully!", async ({ page }) => {
    await page.goto("/auth/login");

    await page.getByRole("textbox", { name: /email/i }).fill(credentials.email);
    await page.getByRole("textbox", { name: /password/i }).fill(credentials.password);

    await page.getByRole("button").click();

    await expect(page.getByRole("heading", { level: 1, name: /giron/i })).toBeVisible();

    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("menuitem", { name: "Logout" }).click();

    await expect(page).toHaveURL("/auth/login");
  });
});
