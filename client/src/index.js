import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { UserProvider } from "./Contexts/UserContext";
import { Children } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecordingProvider } from "./Contexts/RecordingContext";
import { TrackProvider } from "./Contexts/TrackContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RecordingProvider>
        <TrackProvider>
          <BrowserRouter>
            <App>{Children}</App>
          </BrowserRouter>
        </TrackProvider>
      </RecordingProvider>
    </UserProvider>
  </React.StrictMode>
);
