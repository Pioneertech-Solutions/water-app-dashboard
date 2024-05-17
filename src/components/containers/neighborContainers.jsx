import { useApi } from "../../hooks";
import { DeleteNeighbor, EditNeighborPage } from "../ui/neighbor";
import apiService from "../../services/apiService";

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
