import { createContext, useState } from "react";

export const TrackContext = createContext(null);

export const TrackProvider = ({ children }) => {
  const [track, setTrack] = useState({
    measures: [],
    title: "",
    tempo: "60",
    timeSignature: "4/4",
  });

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
