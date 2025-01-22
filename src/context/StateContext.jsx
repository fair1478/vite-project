// StateContext.js
import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [pageState, setPageState] = useState(null);

  return (
    <StateContext.Provider value={{ pageState, setPageState }}>
      {children}
    </StateContext.Provider>
  );
};
