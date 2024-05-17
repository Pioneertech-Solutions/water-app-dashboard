import { useApi } from "../../hooks";
import apiService from "../../services/apiService";
import { EditContribution, NeighborName } from "../ui/contribution";

export const NeighborNameContainer = ({ neighbor }) => {
  const query = useApi({
    fetchDataFunction: () => apiService.contribution.getNeighborName(neighbor),
  });

  return <NeighborName {...query} />;
}

export const EditContributionContainer = ({ contribution_uuid }) => {
  const query = useApi({
    fetchDataFunction: () => apiService.contribution.find(contribution_uuid),
  });

  return <EditContribution {...query} />;
};
