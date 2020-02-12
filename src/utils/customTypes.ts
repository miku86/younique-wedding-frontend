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
  done: boolean;
}

export interface TodoInputs {
  done?: boolean;
  title?: string;
  deadline?: string;
  responsible?: string;
  comment?: string;
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

export interface GuestInputs {
  name?: string;
  comment?: string;
  sentSaveTheDate?: boolean;
  sentInvite?: boolean;
  receivedResponse?: boolean;
  coming?: boolean;
}

export interface BudgetItem {
  PK: string;
  SK: string;
  userId: string;
  budgetItemId: string;
  name: string;
  done: boolean;
  plannedCost: string;
  actualCost: string;
  timestamp: number;
}

export interface BudgetItemInputs {
  name?: string;
  done?: boolean;
  plannedCost?: string;
  actualCost?: string;
}

export interface SettingsInputs {
  availableBudget?: number;
}
