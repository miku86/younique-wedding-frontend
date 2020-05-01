import { useEffect, useReducer, useState } from "react";
import { fetchAll } from "../api/api";

export const FETCH_INIT = "FETCH_INIT";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const DELETE_INIT = "DELETE_INIT";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILURE = "DELETE_FAILURE";
export const READ_TODOS = "READ_TODOS";
export const CREATE_TODO = "CREATE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

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

export const useApiFetch = (initialUrl: string, initialData: any) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataReducer, {
    data: initialData,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    (async () => {
      dispatch({ type: FETCH_INIT });
      try {
        const result = await fetchAll(url);
        dispatch({ type: FETCH_SUCCESS, payload: result });
      } catch (error) {
        dispatch({ type: FETCH_FAILURE });
      }
    })();
  }, [url]);

  return [state, setUrl];
};
