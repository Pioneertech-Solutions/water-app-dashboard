import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { EditNeighborPageContainer } from "../../components/containers/neighborContainers";

export default function EditNeighborPage() {
  const { neighbor_uuid } = useParams();

  return (
    <motion.div
      initial={{ scale: 0.7, translateY: 30 }}
      animate={{ scale: [1.05, 1], translateY: 0 }}
    >
      <EditNeighborPageContainer
        neighbor_uuid={neighbor_uuid}
      />
    </motion.div>
  );
}
