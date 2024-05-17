import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterNeighborPageContainer } from "../../components/containers/dwellingContainers";

export default function RegisterNeighborPage() {
  const { dwelling_uuid } = useParams();

  return (
    <motion.div
      initial={{ scale: 0.7, translateY: 30 }}
      animate={{ scale: [1.05, 1], translateY: 0 }}
    >
      <RegisterNeighborPageContainer dwelling_uuid={dwelling_uuid} />
    </motion.div>
  );
}
