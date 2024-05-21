import { useState } from "react";
import { DwellingCardContainer } from "../../components/containers/dwellingContainers";
import { MapContributionsContainer } from "../../components/containers/mapContainers";
import { motion } from "framer-motion";

export default function HomePage() {
  const [dwellingUuid, setDwellingUuid] = useState("");
  return (
    <motion.div
      initial={{ scale: 0.7, translateY: 30 }}
      animate={{ scale: [1.05, 1], translateY: 0 }}
    >
      <main className="flex w-full h-[70vh] relative">
        <MapContributionsContainer callback={setDwellingUuid} />
      </main>

      <section className="w-full min-[600px]:w-[500px] sm:w-[450px] z-[99999]">
        <div className="h-[30vh] bg-gray-50 dark:bg-gray-700 shadow-lg min-[600px]:rounded-3xl py-2 pt-5 px-5">
          {dwellingUuid ? (
            <DwellingCardContainer dwelling_uuid={dwellingUuid} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm text-gray-300">
                No hay una vivienda seleccionada
              </p>
              <button className="bg-gray-200 dark:bg-gray-800 text-blue-500 px-3 py-1 rounded-full text-xs mt-2">
                Selecciona una vivienda
              </button>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
