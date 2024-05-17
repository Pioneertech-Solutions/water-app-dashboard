import { useState } from "react";
import { useApi } from "../../hooks";
import { DeletePeriodModal } from "../ui/period";
import apiService from "../../services/apiService";

export const DeletePeriodModalContainer = ({ period_uuid }) => {
  const query = useApi({
    fetchDataFunction: () => apiService.period.find(period_uuid),
  });

  const [isSending, setIsSending] = useState(false);
  const [sendingSuccess, setSendingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setSendingSuccess(false);
    setIsSending(true);
    setError(null);
    try {
      await apiService.period.delete(period_uuid);
      setSendingSuccess(true);
    } catch (error) {
      setSendingSuccess(false);
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DeletePeriodModal
      {...query}
      onSubmit={handleSubmit}
      isSending={isSending}
      sendingSuccess={sendingSuccess}
      errorPeriod={error}
    />
  );

}