import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/public";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
