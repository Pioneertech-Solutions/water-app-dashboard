import { useParams } from "react-router-dom";
import { DwellingPageContainer } from "../../components/containers/dwellingContainers";
import { motion } from "framer-motion";

export default function DwellingPage() {
  const { dwelling_uuid } = useParams();

  return (
    <motion.div
      initial={{ scale: 0.7, translateY: 30 }}
      animate={{ scale: [1.05, 1], translateY: 0 }}
    >
      <DwellingPageContainer dwelling_uuid={dwelling_uuid} />
    </motion.div>
  );
}
