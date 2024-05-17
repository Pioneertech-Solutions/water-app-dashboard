import { useState, useEffect } from "react";

const useApi = (
  { fetchDataFunction, sendDataFunction, initial },
  dependencies = []
) => {
  const [data, setData] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendingSuccess, setSendingSuccess] = useState(false);
  const [error, setError] = useState(null);
  const abortController = new AbortController();

  const fetchData = async () => {
    if (!fetchDataFunction) return;
    if (isLoading) return;

    setIsSuccess(false);
    setIsLoading(true);
    try {
      const { signal } = abortController;
      const { data } = await fetchDataFunction({ signal });
      setData(data);
      setIsSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendData = async (dataToSend) => {
    if (!sendDataFunction) return;
    if (isSending) return;

    setSendingSuccess(false);
    setIsSending(true);
    try {
      const { signal } = abortController;
      const { data } = await sendDataFunction(dataToSend, { signal });
      setData(data);
      setSendingSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      abortController.abort();
    };
  }, dependencies);

  return {
    data,
    isLoading,
    error,
    isSuccess,
    refetch: fetchData,
    sendData,
    setData,
    isSending,
    sendingSuccess,
  };
};

export default useApi;
