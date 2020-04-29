import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Dispatch, SetStateAction } from "react";

export type TisAuthenticated = boolean;
export type TsetIsAuthenticated = Dispatch<SetStateAction<TisAuthenticated>>;

export interface IappProps {
  isAuthenticated: TisAuthenticated;
  setIsAuthenticated: TsetIsAuthenticated;
}

export interface DashboardItem {
  amountItems: number;
  amountDoneItems: number;
}

interface DashboardData {
  todos: DashboardItem;
  guests: DashboardItem;
  budget: DashboardItem;
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

export interface HeadCell {
  id: string;
  sorting: boolean;
}

export type Order = "asc" | "desc";

export type OrderBy =
  | keyof TodoInputs
  | keyof GuestInputs
  | keyof BudgetItemInputs;


declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      drawerWidth: string | number
    }
  }
  interface ThemeOptions {
    custom: {
      drawerWidth: string | number
    }
  }
}
