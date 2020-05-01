import { combineReducers } from "redux";
import { STORE_TODOS } from "./actions";

const items = (state = [], action: any) => {
  switch (action.type) {
    case STORE_TODOS:
      return action.items;
    default:
      return state;
  }
};

export default combineReducers({
  items,
});
