import { configureStore } from "@reduxjs/toolkit";
import { threadApi } from "@/api/thread";

export const store = configureStore({
  reducer: {
    [threadApi.reducerPath]: threadApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    threadApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
