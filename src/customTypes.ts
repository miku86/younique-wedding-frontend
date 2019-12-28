import { Dispatch, SetStateAction } from "react";

export interface IappProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};