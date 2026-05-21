import { createBrowserRouter } from "react-router";
import Home from "./components/pages/Home";
import { lazy } from "react";
import ClientLayout from "./components/layouts/ClientRoot";
import HandoffPage from "./components/pages/HandoffPage";
import CreateProjectHandoff from "./components/pages/CreateProjectHandoff";
const RootLayout = lazy(() => import("./components/layouts/Root"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));

export const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: ErrorBoundary,
    // HydrateFallback: Loader,
    children: [
      {
        Component: RootLayout,
        // loader: loginLoader,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "/create",
            Component: CreateProjectHandoff,
          },
        ],
      },
      {
        Component: ClientLayout,
        // loader: () => {
        //   const token = localStorage.getItem("accessToken");
        //   return { token };
        // },
        children: [
          {
            path: "/:id",
            Component: HandoffPage,
          },
        ],
      },
    ],
  },
]);
