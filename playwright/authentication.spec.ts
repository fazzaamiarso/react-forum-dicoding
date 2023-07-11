import { test, expect } from "@playwright/test";

test.describe("Authentication Page", () => {
  test("Logout successfully!", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /giron/i })).toBeVisible();

    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("menuitem", { name: "Logout" }).click();

    await expect(page).toHaveURL("/auth/login");
  });
});
