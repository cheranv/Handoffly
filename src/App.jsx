import { useState } from "react";

import "./styles/globals.scss";
import { RouterProvider } from "react-router";
import { router } from "./routes";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
