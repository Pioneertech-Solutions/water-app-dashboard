import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { CheckingLayout } from "../components/layouts";
import useAuth from "../hooks/useAuth";

export const Router = () => {
  const { status } = useAuth();
  if (status === "checking")
    return <CheckingLayout>Revisando credenciales...</CheckingLayout>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={status === "auth" ? <PrivateRoutes /> : <PublicRoutes />}
        />
      </Routes>
    </BrowserRouter>
  );
};
