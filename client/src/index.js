import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { UserProvider } from "./Contexts/UserContext";
import { Children } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecordingProvider } from "./Contexts/RecordingContext";
import { TrackProvider } from "./Contexts/TrackContext";
import { FetchMessageProvider } from "./Contexts/FetchMessageContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RecordingProvider>
        <TrackProvider>
          <FetchMessageProvider>
            <BrowserRouter>
              <App>{Children}</App>
            </BrowserRouter>
          </FetchMessageProvider>
        </TrackProvider>
      </RecordingProvider>
    </UserProvider>
  </React.StrictMode>
);
