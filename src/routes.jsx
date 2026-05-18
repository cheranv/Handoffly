import { createBrowserRouter } from "react-router";
import Home from "./components/pages/Home";
import { lazy } from "react";
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
        ],
      },
      {
        // Component: GuestRoot,
        // loader: () => {
        //   const token = localStorage.getItem("accessToken");
        //   return { token };
        // },
        // children: [
        //   {
        //     Component: AuthPageLayout,
        //     children: [
        //       {
        //         path: "login",
        //         Component: Login,
        //       },
        //     ],
        //   },
        // ],
      },
    ],
  },
]);
