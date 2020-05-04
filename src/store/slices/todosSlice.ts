import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../utils/customTypes";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    isError: false,
    isLoading: false,
    items: [] as Todo[],
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    storeTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.isLoading = false;
    },
    errorLoading(state) {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const { storeTodos, startLoading, errorLoading } = todosSlice.actions;

export default todosSlice.reducer;

export const loadTodos = (path: string) => (dispatch: any, getState: any, api: any) => {
  dispatch(startLoading());
  api
  .fetchAll(path)
  .then((items: Todo[]) => {
    dispatch(storeTodos(items));
  })
  .catch(() => {
    dispatch(errorLoading());
  });
};
