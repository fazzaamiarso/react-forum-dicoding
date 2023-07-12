import { describe, test, expect } from "vitest";
import reducer, { hideLoading, showLoading } from "../loadingSlice";

// @vitest-environment jsdom
describe("Loading Reducers", () => {
  test("should return initial state", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      loading: false,
      pendingPromisesCount: 0,
    });
  });

  test("should be able to go into loading state", async () => {
    expect(reducer(undefined, showLoading())).toEqual({
      loading: true,
      pendingPromisesCount: 1,
    });
  });

  test("should not be in loading state when there are no pending promises", async () => {
    expect(reducer({ loading: true, pendingPromisesCount: 1 }, hideLoading())).toEqual({
      loading: false,
      pendingPromisesCount: 0,
    });
  });

  test("should be still in loading state when there are still pending promises", async () => {
    expect(reducer({ loading: true, pendingPromisesCount: 3 }, hideLoading())).toEqual({
      loading: true,
      pendingPromisesCount: 2,
    });
  });

  test("should not be able to have negative pendingPromisesCount", async () => {
    expect(reducer({ loading: false, pendingPromisesCount: 0 }, hideLoading())).toEqual({
      loading: false,
      pendingPromisesCount: 0,
    });
  });
});
