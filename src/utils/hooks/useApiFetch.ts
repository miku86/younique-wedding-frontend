import { API as AMPLIFY } from "aws-amplify";
import { useEffect, useReducer, useState } from "react";
import { config } from "../../config";

const FETCH_INIT = "FETCH_INIT";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

const fetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case FETCH_INIT:
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
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useApiFetch = (initialUrl: string, initialData: any) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(fetchReducer, {
    data: initialData,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    (async () => {
      dispatch({ type: FETCH_INIT });
      try {
        const result = await AMPLIFY.get(config.API.NAME, url, {});
        dispatch({ type: FETCH_SUCCESS, payload: result });
      } catch (error) {
        dispatch({ type: FETCH_FAILURE });
      }
    })();
  }, [url]);

  return [state, setUrl];
};
