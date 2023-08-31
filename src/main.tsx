import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContexProvider } from "./context/authContext";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContexProvider>
      <App />
    </AuthContexProvider>
  </React.StrictMode>
);
