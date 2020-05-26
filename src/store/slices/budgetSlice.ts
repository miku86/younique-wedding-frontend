import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { BudgetItem } from "../../utils/customTypes";
import { AppDispatch } from "../store";

let initialState = {
  items: [] as BudgetItem[],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    storeBudget(state, action: PayloadAction<BudgetItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { storeBudget } = budgetSlice.actions;

export default budgetSlice.reducer;

export const fetchAll = (path: string) => (dispatch: AppDispatch) => {
  api.fetchAll(path).then((items: BudgetItem[]) => {
    dispatch(storeBudget(items));
  });
};
