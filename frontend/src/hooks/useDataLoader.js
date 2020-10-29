import { useEffect, useContext } from "react";
import { Context } from "./Store";

const useDataLoader = (query, type) => {
  const baseUrl = `https://sonar-survey-rioz6g7rrq-lz.a.run.app/sonar/${query}`;

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: `FETCH_${type}_INIT` });
      try {
        const response = await fetch(baseUrl, {});
        const json = await response.json();

        if (!didCancel) {
          dispatch({
            type: `FETCH_${type}_SUCCESS`,
            payload: { ...json },
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: `FETCH_${type}_FAILURE`, error });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [query]);

  return { ...state };
};

export default useDataLoader;