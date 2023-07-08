import { configureStore } from "@reduxjs/toolkit";
import { threadApi } from "@/services/api/thread";
import { commentApi } from "./services/api/comment";
import { userApi } from "./services/api/user";
import authSlice from "./services/authSlice";
import loadingSlice from "./services/loadingSlice";
import { listenerMiddleware } from "./services/listenerMiddleware";
import { leaderboardsApi } from "./services/api/leaderboards";
import { baseApi } from "./services/api/base";

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [leaderboardsApi.reducerPath]: leaderboardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(
        baseApi.middleware,
        threadApi.middleware,
        commentApi.middleware,
        userApi.middleware,
        leaderboardsApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
