import { Navigate, createBrowserRouter } from "react-router";
import Home from "./components/pages/Home";
import { lazy } from "react";
import ClientLayout from "./components/layouts/ClientRoot";
import HandoffPage from "./components/pages/HandoffPage";
import CreateProjectHandoff from "./components/pages/CreateProjectHandoff";
const RootLayout = lazy(() => import("./components/layouts/Root"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"));

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTES (No token required)
  {
    path: "/home",
    Component: Home, // Render Home directly without RootLayout checking for a token
    ErrorBoundary: ErrorBoundary,
  },

  // 2. PROTECTED ROUTES (Token required)
  {
    path: "/",
    Component: RootLayout, // This layout protects everything inside its children array
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        element: <Navigate to="/create" replace />, // Redirect root "/" to "/create"
      },
      {
        path: "create", // Becomes /create
        Component: CreateProjectHandoff,
      },
    ],
  },

  // 3. SHARE ROUTES (Public or separate logic)
  {
    path: "/share",
    Component: ClientLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: ":id",
        Component: HandoffPage,
      },
    ],
  },
  {
    path: "/preview",
    Component: ClientLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: ":id",
        Component: HandoffPage,
      },
    ],
  },

  // 4. CATCH-ALL REDIRECT
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);
