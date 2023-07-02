import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root.tsx";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home.tsx";
import ThreadDetail from "./routes/thread-detail.tsx";
import Register from "./routes/auth/register.tsx";
import Login from "./routes/auth/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "threads/:threadId",
        element: <ThreadDetail />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
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
