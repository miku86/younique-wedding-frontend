import { DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS, FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from "./actions";

export const dataReducer = (state: any, action: any) => {
  switch (action.type) {
    case FETCH_INIT:
    case DELETE_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: state.data.filter((item: any) => item !== action.payload),
      };

    case FETCH_FAILURE:
    case DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
