import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.scss";
import { AuthContexProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContexProvider>
      <App />
    </AuthContexProvider>
  </React.StrictMode>
);
