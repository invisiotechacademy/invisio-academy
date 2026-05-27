import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#18181b",
          color: "#fff",
          border:
            "1px solid rgba(255,255,255,0.1)",
        },
      }}
    />

    <App />
  </React.StrictMode>
);