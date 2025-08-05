import { createContext, useContext } from "react";

export const ResetContext = createContext({
  handleReset: () => {},
  setHandleResetFn: () => {},
});

export const useReset = () => useContext(ResetContext);
