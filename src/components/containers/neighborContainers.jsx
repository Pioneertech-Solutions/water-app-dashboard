import { useApi } from "../../hooks";
import {DeleteNeighbor, EditNeighborPage, SearchNeighbor} from "../ui/neighbor";
import apiService from "../../services/apiService";
import {useEffect, useState} from "react";

export function EditNeighborPageContainer({ neighbor_uuid }) {
  const query = useApi({
    fetchDataFunction: () => apiService.neighbor.find(neighbor_uuid),
    sendDataFunction: (data) => apiService.neighbor.update(neighbor_uuid, data),
  });

  const onChange = (e) => {
    query.setData({
      ...query.data,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    query.sendData(query.data);
  };

  return (
    <EditNeighborPage {...query} onChange={onChange} onSubmit={onSubmit} />
  );
}

export function DeleteNeighborContainer({ neighbor_uuid, refetch: refetch_neighbors }) {
  const query = useApi({
    sendDataFunction: () => apiService.neighbor.delete(neighbor_uuid),
  });

  return <DeleteNeighbor {...query} refetch_neighbors={refetch_neighbors} />;
}

export function SearchNeighborContainer() {
  const [search, setSearch] = useState("");
  const [timeId, setTimeId] = useState(null);
  const query = useApi({
    sendDataFunction: (search) => apiService.neighbor.search(search),
  });

  useEffect(() => {
    if (timeId) {
      clearTimeout(timeId);
    }

    setTimeId(setTimeout(() => {
      query.sendData(search);
    }, 500));
  }, [search]);

  useEffect(() => {
    console.log(query.data);
  }, [query.data]);

  return <SearchNeighbor search={search} setSearch={setSearch} {...query} />;
}
