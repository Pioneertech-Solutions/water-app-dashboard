import { useState, useEffect } from "react";

const useQueries = ({ fetchDataFunctions, sendDataFunction, initial }, dependencies = []) => {
  const [data, setData] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if(!fetchDataFunctions || !Array.isArray(fetchDataFunctions)) return;
    if (isLoading) return;

    setIsLoading(true);
    try {
      const responses = await Promise.all(fetchDataFunctions.map(fn => fn()));
      const newData = responses.map(res => res.data);
      setData(newData);
      setIsSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendData = async (dataToSend) => {
    if (!sendDataFunction) return;
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const { data } = await sendDataFunction(dataToSend);
      setData(data);
      setIsSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, isLoading, error, isSuccess, refetch: fetchData, sendData };
};

export default useQueries;
