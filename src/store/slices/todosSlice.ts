import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../config";
import { Todo, TodoInputs } from "../../utils/customTypes";
import { AppDispatch } from "../store";

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
    },
    errorServer(state) {
      state.isLoading = false;
      state.isError = true;
    },
    storeTodo(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },
    removeTodo(state, action: PayloadAction<Todo["todoId"]>) {
      state.items = state.items.filter(item => item.todoId !== action.payload);
    }
  }
});

export const { storeTodos, startLoading, errorLoading, errorServer, storeTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;

export const loadTodos = () => (dispatch: AppDispatch, _: any, api: any) => {
  dispatch(startLoading());
  api
    .fetchAll(API.TODOS)
    .then((items: Todo[]) => {
      dispatch(storeTodos(items));
    })
    .catch(() => {
      dispatch(errorLoading());
    });
};

export const addTodo = (todo: TodoInputs) => (dispatch: AppDispatch, _: any, api: any) => {
  dispatch(startLoading());
  api
    .createOne(API.TODOS, todo)
    .then((item: Todo) => {
      dispatch(storeTodo(item));
    })
    .catch(() => {
      dispatch(errorServer());
    });
};

export const deleteTodo = (id: string) => (dispatch: AppDispatch, _: any, api: any) => {
  api
    .deleteOne(API.TODOS, id)
    .then(({itemId}: {itemId: Todo["todoId"]}) => {
      dispatch(removeTodo(itemId));
    })
    .catch(() => {
      dispatch(errorServer());
    });
};
