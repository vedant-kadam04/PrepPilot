import React from "react";
import ReactDom from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);