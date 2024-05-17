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
      <main className="flex w-full h-full relative">
        <div className={`w-full h-screen transition-width`}>
          <div className="w-full h-full shadow-lg overflow-hidden relative z-10">
            <MapContributionsContainer callback={setDwellingUuid} />
          </div>
        </div>
      </main>

      <section className="fixed bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-full min-[600px]:w-[500px] sm:w-[450px] z-[99999] p-3">
        {dwellingUuid && <DwellingCardContainer dwelling_uuid={dwellingUuid} />}

        {!dwellingUuid && (
          <div className="h-56 bg-gray-50 dark:bg-gray-700 shadow-lg rounded-3xl">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm text-gray-300">
                No hay una vivienda seleccionada
              </p>
              <button className="bg-gray-200 dark:bg-gray-800 text-blue-500 px-3 py-1 rounded-full text-xs mt-2">
                Selecciona una vivienda
              </button>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}
