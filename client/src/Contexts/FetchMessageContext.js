import { createContext, useState } from "react";

export const FetchMessageContext = createContext("");

export const FetchMessageProvider = ({ children }) => {
  const [fetchMessage, setFetchMessage] = useState("Welcome!");
  return (
    <FetchMessageContext.Provider value={{ fetchMessage, setFetchMessage }}>
      {children}
    </FetchMessageContext.Provider>
  );
};
