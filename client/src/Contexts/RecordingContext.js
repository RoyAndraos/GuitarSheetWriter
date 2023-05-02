import { createContext, useState } from "react";

export const RecordingContext = createContext(null);

export const RecordingProvider = ({ children }) => {
  const [currentlyRecording, setCurrentlyRecording] = useState(false);
  return (
    <RecordingContext.Provider
      value={{ currentlyRecording, setCurrentlyRecording }}
    >
      {children}
    </RecordingContext.Provider>
  );
};
