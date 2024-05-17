import { useApi } from "../../hooks";
import apiService from "../../services/apiService";
import { MapContributions } from "../ui/map";

export function MapContributionsContainer({ callback }) {
  const query = useApi({
    fetchDataFunction: () => apiService.map.contribuions(),
  });

  return <MapContributions {...query} callback={callback} />;
}
