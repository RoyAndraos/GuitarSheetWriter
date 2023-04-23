import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { UserProvider } from "./UserContext";
import { Children } from "react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App>{Children}</App>
    </UserProvider>
  </React.StrictMode>
);
