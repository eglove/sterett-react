import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { router } from "./routes/route-tree.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion,ethang/handle-native-error
ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
