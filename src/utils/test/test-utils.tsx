import React, { type PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { type AppStore, type RootState, setupStore } from "@/store";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // For now, only capable of rendering an element
  const router = createMemoryRouter([{ path: "/", element: ui }], {
    initialEntries: ["/"],
    initialIndex: 0,
  });

  const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(<RouterProvider router={router} />, { wrapper: Wrapper, ...renderOptions }),
  };
}

export const forumAPI = (path: string): string => {
  return new URL(path, "https://forum-api.dicoding.dev/v1/").toString();
};
