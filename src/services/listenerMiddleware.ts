import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { userApi } from "./api/user";
import { logout } from "./authSlice";
import { threadApi } from "./api/thread";
import { showLoading } from "react-redux-loading-bar";

export const listenereMiddleware = createListenerMiddleware();

listenereMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action) => {
    localStorage.setItem("giron-auth-token", action.payload.token);
  },
});

listenereMiddleware.startListening({
  actionCreator: logout,
  effect: async () => {
    localStorage.removeItem("giron-auth-token");
  },
});

listenereMiddleware.startListening({
  matcher: isAnyOf(
    userApi.endpoints.getOwnProfile.matchPending,
    threadApi.endpoints.getAllThreads.matchPending
  ),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(showLoading());
  },
});
