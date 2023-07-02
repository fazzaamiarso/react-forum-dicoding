import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./api/user";
import { logout } from "./authSlice";

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
