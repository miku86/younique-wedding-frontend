import { combineReducers } from "redux";
import budgetReducer from "./budgetSlice";
import dashboardReducer from "./dashboardSlice";
import guestsReducer from "./guestsSlice";
import todosReducer from "./todosSlice";

export default combineReducers({
  dashboard: dashboardReducer,
  todos: todosReducer,
  guests: guestsReducer,
  budget: budgetReducer,
});
