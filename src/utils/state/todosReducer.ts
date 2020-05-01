import { CREATE_TODO, DELETE_TODO, READ_TODOS, UPDATE_TODO } from "./actions";

export const todosReducer = (state: any, action: any) => {
  switch (action.type) {
    case READ_TODOS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case CREATE_TODO:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: state.concat(action.payload),
      };

    case UPDATE_TODO:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case DELETE_TODO:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: state.filter((item: any) => item !== action.payload),
      };

    default:
      return state;
  }
};
