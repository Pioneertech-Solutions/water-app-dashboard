import { useParams } from "react-router-dom";
import { EditContributionContainer } from "../../components/containers/contributionContainers";

export default function EditContributionsPage() {
  const { contribution_uuid } = useParams();
  
  return (
    <div>
      <EditContributionContainer contribution_uuid={contribution_uuid} />
    </div>
  )
}
