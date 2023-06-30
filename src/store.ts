import { configureStore } from "@reduxjs/toolkit";
import { threadApi } from "@/api/thread";
import { userApi } from "./api/user";

export const store = configureStore({
  reducer: {
    [threadApi.reducerPath]: threadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    threadApi.middleware,
    userApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
