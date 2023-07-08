import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";
import loadingSlice from "./services/loadingSlice";
import { listenerMiddleware } from "./services/listenerMiddleware";
import { baseApi } from "./services/api/base";

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice,
    loading: loadingSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
