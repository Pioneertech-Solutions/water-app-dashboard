import { createContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dwellings, setDwellings] = useState([]);

  return (
    <DataContext.Provider
      value={{
        dwellings,
        setDwellings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
