import { createContext, useEffect, useState } from "react";

const DarkContext = createContext();

const DarkProvider = ({ children }) => {
  // const [dark, setDark] = useState(localStorage.getItem("dark") === "true");
  const [dark, setDark] = useState(localStorage.getItem("dark") === "true" || true);

  useEffect(() => {
    localStorage.setItem("dark", dark);

    // html class dark
    if (dark) {
      let color = "#111827";
      color = '#000'
      document.documentElement.classList.add("dark");
      document.querySelector("meta[name=theme-color]").content = color;
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector("meta[name=theme-color]").content = "#fff";
    }
  }, [dark]);

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  );
};

export { DarkProvider };
export default DarkContext;
