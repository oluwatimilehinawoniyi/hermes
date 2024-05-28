import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@assets/styles/scroll.css";
import App from "./App";
import AuthProvider from "@context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
