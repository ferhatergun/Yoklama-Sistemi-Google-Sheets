import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
