import { Dispatch, SetStateAction } from "react";

export type TisAuthenticated = boolean;
export type TsetIsAuthenticated = Dispatch<SetStateAction<TisAuthenticated>>;

export interface IappProps {
  isAuthenticated: TisAuthenticated;
  setIsAuthenticated: TsetIsAuthenticated;
}
