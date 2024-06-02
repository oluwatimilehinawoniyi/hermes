import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@assets/styles/scroll.css";
import App from "./App";
import AuthProvider from "@context/AuthProvider";
import { ModalProvider } from "@context/ModalProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
