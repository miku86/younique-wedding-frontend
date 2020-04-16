import { useContext, createContext } from "react";
import { IappProps } from "./customTypes";

export const AppContext = createContext<Partial<IappProps>>({});

export const useAppContext = () => {
  return useContext(AppContext);
};
