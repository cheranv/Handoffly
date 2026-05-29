import { Navigate, createBrowserRouter } from "react-router";
import Home from "./components/pages/Home";
import { lazy } from "react";
import ClientLayout from "./components/layouts/ClientRoot";
import HandoffPage from "./components/pages/HandoffPage";
import CreateProjectHandoff from "./components/pages/CreateProjectHandoff";
import Dashboard from "./components/pages/Dashboard";
import { FetchProjects } from "./components/Apis/dashboard";
import { GetProject } from "./components/Apis/HandoffPage";
import demodata from "./components/commonComponents/demoData.json";

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
        loader: () => {
          localStorage.removeItem("project");
          return FetchProjects();
        },
        Component: Dashboard, // Redirect root "/" to "/create"
      },
      {
        path: "create", // Becomes /create
        Component: CreateProjectHandoff,
      },
      {
        path: "share", // Becomes /create
        children: [
          // {
          //   path: "demo",
          //   Component: HandoffPage,
          //   loader: () => {
          //     localStorage.removeItem("project");
          //     return {
          //       data: { project: demodata },
          //     };
          //   },
          // },
          // {
          //   path: ":id",
          //   loader: ({ params, request }) => {
          //     localStorage.removeItem("project");
          //     return GetProject({ params, request });
          //   },
          //   Component: HandoffPage,
          // },
          // {
          //   path: "preview",
          //   loader: () => {
          //     return {
          //       data:
          //         localStorage.getItem("project") &&
          //         JSON.parse(localStorage.getItem("project")),
          //     };
          //   },
          //   Component: HandoffPage,
          // },
        ],
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
        path: "demo",
        Component: HandoffPage,
        loader: () => {
          localStorage.removeItem("project");

          return {
            data: { project: demodata },
          };
        },
      },
      {
        path: ":id",
        loader: ({ params, request }) => {
          localStorage.removeItem("project");
          return GetProject({ params, request });
        },
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
        index: true,
        loader: () => {
          return {
            data:
              localStorage.getItem("project") &&
              JSON.parse(localStorage.getItem("project")),
          };
        },
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
