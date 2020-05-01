import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { BudgetItem } from "../../utils/customTypes";

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

export const fetchAll = (path: string) => (dispatch: any) => {
  api.fetchAll(path).then((items: BudgetItem[]) => {
    dispatch(storeBudget(items));
  });
};
