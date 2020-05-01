import { combineReducers } from "redux";
import budgetReducer from "./slices/budgetSlice";
import dashboardReducer from "./slices/dashboardSlice";
import guestsReducer from "./slices/guestsSlice";
import todosReducer from "./slices/todosSlice";

export default combineReducers({
  dashboard: dashboardReducer,
  todos: todosReducer,
  guests: guestsReducer,
  budget: budgetReducer,
});
