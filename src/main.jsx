import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BusProvider } from "./context/BusContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BusProvider>
      <App />
    </BusProvider>
  </AuthProvider>
);
