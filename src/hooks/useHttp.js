import { useState, useCallback } from "react";

const useHttp = (getData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyDataFn) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = getData(requestConfig);
      applyDataFn(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, [getData]);

  return {
    isLoading,
    error,
    sendRequest
  };
};

export { useHttp };
