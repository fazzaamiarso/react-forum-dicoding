import { setupStore } from "@/store";
import { describe, test } from "vitest";
import { userApi } from "../api/user";

// @vitest-environment jsdom
describe("Smoke test", () => {
  const store = setupStore();
  test("Smoke", async () => {
    await store.dispatch(userApi.endpoints.getOwnProfile.initiate());
    console.log(store.getState().api.queries);
  });
});
