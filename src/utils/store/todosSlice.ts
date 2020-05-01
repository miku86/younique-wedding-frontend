import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";
import { Todo } from "../customTypes";

let initialState = {
  items: [] as Todo[],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    storeTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
  },
});

export const { storeTodos } = todosSlice.actions;

export default todosSlice.reducer;

export const fetchAll = (path: string) => (dispatch: any) => {
  api.fetchAll(path).then((items: Todo[]) => {
    dispatch(storeTodos(items));
  });
};
