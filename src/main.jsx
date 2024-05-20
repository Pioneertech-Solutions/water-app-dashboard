import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "@splidejs/react-splide/css";
import { Toaster } from "react-hot-toast";
import { PwaInstallPrompt } from "./components/ui/pwa.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
    <Toaster position="top-center" />
  </React.StrictMode>
);
