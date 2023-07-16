import { test as setup, expect } from "@playwright/test";

const credentials = {
  email: process.env.TEST_EMAIL ?? "",
  password: process.env.TEST_PASSWORD ?? "",
};

const authFile = "playwright/.auth/storage.json";

// Run Login once against real API to verify integrity
setup("Login and Set Storage State", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /log in/i }).click();

  await expect(page).toHaveURL("/auth/login");

  await page.getByRole("textbox", { name: /email/i }).fill(credentials.email);
  await page.getByRole("textbox", { name: /password/i }).fill(credentials.password);

  await page.getByRole("button").click();
  await page.waitForURL("/");

  // Make sure to save the loggedin state on every test run
  await page.context().storageState({ path: authFile });
});
