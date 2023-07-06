import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { userApi } from "./api/user";
import { logout } from "./authSlice";
import { threadApi } from "./api/thread";
import { hideLoading, showLoading } from "./loadingSlice";
import { leaderboardsApi } from "./api/leaderboards";
import { commentApi } from "./api/comment";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action) => {
    localStorage.setItem("giron-auth-token", action.payload.token);
  },
});

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async () => {
    localStorage.removeItem("giron-auth-token");
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    ...Array.from(Object.values(userApi.endpoints).map((endpoint) => endpoint.matchPending)),
    ...Array.from(
      Object.values(leaderboardsApi.endpoints).map((endpoint) => endpoint.matchPending)
    ),
    ...Array.from(Object.values(commentApi.endpoints).map((endpoint) => endpoint.matchPending)),
    ...Array.from(Object.values(threadApi.endpoints).map((endpoint) => endpoint.matchPending))
  ),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(showLoading());
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    ...Array.from(Object.values(userApi.endpoints).map((endpoint) => endpoint.matchFulfilled)),
    ...Array.from(
      Object.values(leaderboardsApi.endpoints).map((endpoint) => endpoint.matchFulfilled)
    ),
    ...Array.from(Object.values(commentApi.endpoints).map((endpoint) => endpoint.matchFulfilled)),
    ...Array.from(Object.values(threadApi.endpoints).map((endpoint) => endpoint.matchFulfilled))
  ),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(hideLoading());
  },
});
