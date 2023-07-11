import { test as setup, expect } from "@playwright/test";

const credentials = {
  email: process.env.TEST_EMAIL ?? "",
  password: process.env.TEST_PASSWORD ?? "",
};

const authFile = "playwright/.auth/storage.json";

setup("Login and Set Storage State", async ({ page }) => {
  await page.goto("/auth/login");

  await page.getByRole("textbox", { name: /email/i }).fill(credentials.email);
  await page.getByRole("textbox", { name: /password/i }).fill(credentials.password);

  await page.getByRole("button").click();
  await page.waitForURL("/");

  await page.context().storageState({ path: authFile });
});
