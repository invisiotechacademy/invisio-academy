import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  Toaster,
} from "react-hot-toast";

import {
  ThemeProvider,
} from "./context/theme-context";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  ) as HTMLElement
).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />

      <Toaster
        position="top-right"
      />
    </ThemeProvider>
  </React.StrictMode>
);