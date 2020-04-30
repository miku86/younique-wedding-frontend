import { useEffect, useReducer, useState } from "react";
import { fetchAll } from "../api/api";
import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from "../state/actions";
import { dataReducer } from "../state/dataReducer";

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
