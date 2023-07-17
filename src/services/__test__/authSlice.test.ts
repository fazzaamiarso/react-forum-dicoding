import { describe, test, expect } from "vitest";
import reducer, { logout } from "../authSlice";
import { faker } from "@faker-js/faker";

// @vitest-environment jsdom
describe("Auth Reducers", () => {
  test("should return initial state", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ user: null, token: null });
  });

  test("should be able to reset auth state", async () => {
    expect(reducer({ token: faker.string.uuid(), user: null }, logout())).toEqual({
      token: null,
      user: null,
    });
  });
});
