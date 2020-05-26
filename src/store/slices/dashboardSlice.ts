import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { DashboardData, DashboardItem } from "../../utils/customTypes";
import { AppDispatch } from "../store";

let initialState: DashboardData = {
  todos: {} as DashboardItem,
  guests: {} as DashboardItem,
  budget: {} as DashboardItem,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    storeDashboard(state, action: PayloadAction<DashboardData>) {
      state.todos = action.payload.todos;
      state.guests = action.payload.guests;
      state.budget = action.payload.budget;
    },
  },
});

export const { storeDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;

export const fetchAll = (path: string) => (dispatch: AppDispatch) => {
  api.fetchAll(path).then((items: DashboardData) => {
    dispatch(storeDashboard(items));
  });
};
