import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root.tsx";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home.tsx";
import ThreadDetail from "./routes/thread/detail.tsx";
import Register from "./routes/auth/register.tsx";
import Login from "./routes/auth/login.tsx";
import NewThread from "./routes/thread/new.tsx";
import Leaderboard from "./routes/leaderboards.tsx";

import "@fontsource-variable/open-sans";
import AppLayout from "./routes/app-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "leaderboards",
            element: <Leaderboard />,
          },
          {
            path: "threads",
            children: [
              {
                path: ":threadId",
                element: <ThreadDetail />,
              },
              {
                path: "new",
                element: <NewThread />,
              },
            ],
          },
        ],
      },
      {
        path: "/auth",
        children: [
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
