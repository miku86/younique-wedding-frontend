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
  userId: string;
  todoId: string;
  title: string;
  comment: string;
  deadline: string;
  responsible: string;
  timestamp: number;
}

export interface Guest {
  PK: string;
  SK: string;
  userId: string;
  guestId: string;
  name: string;
  comment: string;
  sentSaveTheDate: boolean;
  sentInvite: boolean;
  receivedResponse: boolean;
  coming: boolean;
  timestamp: number;
}
