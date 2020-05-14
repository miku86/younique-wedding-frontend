import { BudgetItem, Guest, Todo } from "../utils/customTypes";

export interface SliceState {
  isError: false,
  isLoading: false,
  items: Todo[] | Guest[] | BudgetItem[]
}

export interface AppState {
  todos: SliceState,
  guests: SliceState,
  budget: SliceState,
  dashboard: any,
}