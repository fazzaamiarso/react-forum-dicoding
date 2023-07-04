import { configureStore } from "@reduxjs/toolkit";
import { threadApi } from "@/services/api/thread";
import { commentApi } from "./services/api/comment";
import { userApi } from "./services/api/user";
import authSlice from "./services/authSlice";
import loadingSlice from "./services/loadingSlice";
import { listenereMiddleware } from "./services/listenerMiddleware";
import { leaderboardsApi } from "./services/api/leaderboards";

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
    [threadApi.reducerPath]: threadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [leaderboardsApi.reducerPath]: leaderboardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    listenereMiddleware.middleware, // must be placed before defaultMiddleware
    ...getDefaultMiddleware(),
    threadApi.middleware,
    commentApi.middleware,
    userApi.middleware,
    leaderboardsApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
