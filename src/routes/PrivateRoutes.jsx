import { Route, Routes, Navigate } from "react-router-dom";
import {
  DwellingPage,
  EditContributionsPage,
  EditNeighborPage,
  HomePage,
  RegisterContributionPage,
  RegisterNeighborPage,
  RegisterPeriodPage,
  SearchPage,
} from "../pages/private";
import { AppLayout, SubpageLayout } from "../components/layouts";

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>

      <Route path="dwellings" element={<SubpageLayout />}>
        <Route path=":dwelling_uuid" element={<DwellingPage />} />
        <Route
          path=":dwelling_uuid/register-neighbor"
          element={<RegisterNeighborPage />}
        />
        <Route
          path=":dwelling_uuid/register-period"
          element={<RegisterPeriodPage />}
        />
        <Route
          path=":dwelling_uuid/register-contribution"
          element={<RegisterContributionPage />}
        />
      </Route>

      <Route path="contributions" element={<SubpageLayout />}>
        <Route
          path=":contribution_uuid/edit"
          element={<EditContributionsPage />}
        />
      </Route>


      <Route path="neighbors" element={<SubpageLayout />}>
        <Route
          path=":neighbor_uuid/edit"
          element={<EditNeighborPage />}
        />
      </Route>

      <Route path="/login" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
