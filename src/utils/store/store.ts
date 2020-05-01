import { applyMiddleware, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";
import api from "../api/api";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(api)), devToolsEnhancer({}))
);

export default store;
