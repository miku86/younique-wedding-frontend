import { Dispatch, SetStateAction } from "react";

export type TisAuthenticated = boolean;
export type TsetIsAuthenticated = Dispatch<SetStateAction<TisAuthenticated>>;

export interface IappProps {
  isAuthenticated: TisAuthenticated;
  setIsAuthenticated: TsetIsAuthenticated;
}

export interface Todo {
  PK: string;
  SK: string;
  todoId: string;
  userId: string;
  title: string;
  comment: string;
  deadline: string;
  responsible: string;
  timestamp: number;
}
