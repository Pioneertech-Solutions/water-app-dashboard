import { useContext } from "react";
import DarkContext from "../contexts/DarkProvider";

export default function useDark() {
  return useContext(DarkContext);
}
