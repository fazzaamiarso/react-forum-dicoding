import { type PreloadedState, configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";
import loadingSlice from "./services/loadingSlice";
import { listenerMiddleware } from "./services/listenerMiddleware";
import { baseApi } from "./services/api/base";

const reducers = combineReducers({
  auth: authSlice,
  loading: loadingSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    preloadedState,
    devTools: true,
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(baseApi.middleware),
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
