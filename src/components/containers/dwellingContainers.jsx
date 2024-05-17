import { useState } from "react";
import { useApi } from "../../hooks";
import apiService from "../../services/apiService";
import {
  DwellingPage,
  DwellingCard,
  InhabitedButton,
  LastContribution,
  PendingPeriods,
  Contributions,
  Neighbors,
  RegisterNeighborPage,
  RegisterPeriodPage,
  RegisterContributionPage,
} from "../ui/dwelling";

export function DwellingPageContainer({ dwelling_uuid }) {
  const query = useApi(
    {
      fetchDataFunction: () => apiService.dwelling.find(dwelling_uuid),
    },
    [dwelling_uuid]
  );
  return <DwellingPage {...query} />;
}

export function DwellingCardContainer({ dwelling_uuid }) {
  const query = useApi(
    {
      fetchDataFunction: () => apiService.dwelling.find(dwelling_uuid),
    },
    [dwelling_uuid]
  );
  return <DwellingCard {...query} />;
}

export function InhabitedContainer({ dwelling_uuid, inhabited }) {
  const query = useApi({
    sendDataFunction: () => apiService.dwelling.changeInhabited(dwelling_uuid),
    initial: inhabited,
  });

  const handleClick = () => query.sendData();
  return <InhabitedButton {...query} onClick={handleClick} />;
}

export function LastContributionContainer({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () =>
      apiService.dwelling.getLastContribution(dwelling_uuid),
  });
  return <LastContribution {...query} />;
}

export function PendingPeriodsContainer({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () =>
      apiService.dwelling.getPendingPeriods(dwelling_uuid),
  });
  return <PendingPeriods {...query} />;
}

export function NeighborsContainer({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () => apiService.dwelling.getNeighbors(dwelling_uuid),
  });

  return <Neighbors {...query} />;
}

export function ContributionsContainer({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () =>
      apiService.dwelling.getContributions(dwelling_uuid),
  });
  return <Contributions {...query} />;
}

export function RegisterNeighborPageContainer({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () => apiService.dwelling.find(dwelling_uuid),
  });

  const [neighbor, setNeighbor] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendingSuccess, setSendingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setNeighbor({
      ...neighbor,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setSendingSuccess(false);
    setIsSending(true);
    setError(null);
    try {
      await apiService.dwelling.createNeighbor(dwelling_uuid, neighbor);
      setSendingSuccess(true);
    } catch (error) {
      setSendingSuccess(false);
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <RegisterNeighborPage
      {...query}
      neighbor={neighbor}
      onChange={onChange}
      onSubmit={handleSubmit}
      isSending={isSending}
      sendingSuccess={sendingSuccess}
      errorNeighbor={error}
    />
  );
}

export function RegisterPeriodPageContainer({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () => apiService.dwelling.find(dwelling_uuid),
  });

  const [period, setPeriod] = useState({
    year: '',
    month: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [sendingSuccess, setSendingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setPeriod({
      ...period,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setSendingSuccess(false);
    setIsSending(true);
    setError(null);
    try {
      await apiService.dwelling.createPeriod(dwelling_uuid, period);
      setSendingSuccess(true);
    } catch (error) {
      setSendingSuccess(false);
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <RegisterPeriodPage
      {...query}
      period={period}
      onChange={onChange}
      onSubmit={handleSubmit}
      isSending={isSending}
      sendingSuccess={sendingSuccess}
      errorPeriod={error}
    />
  )
}

export function RegisterContributionPageContainer ({ dwelling_uuid }) {
  const query = useApi({
    fetchDataFunction: () => apiService.dwelling.find(dwelling_uuid),
  });

  const [contribution, setContribution] = useState({
    year: '',
    month: '',
    amount: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [sendingSuccess, setSendingSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setContribution({
      ...contribution,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setSendingSuccess(false);
    setIsSending(true);
    setError(null);
    try {
      await apiService.dwelling.createContribution(dwelling_uuid, contribution);
      setSendingSuccess(true);
    } catch (error) {
      setSendingSuccess(false);
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <RegisterContributionPage
      {...query}
      contribution={contribution}
      onChange={onChange}
      onSubmit={handleSubmit}
      isSending={isSending}
      sendingSuccess={sendingSuccess}
      errorContribution={error}
    />
  );
}
