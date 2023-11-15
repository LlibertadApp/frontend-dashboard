import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { paths } from "./paths";
import LoadingPage from "../pages/loading-page/loadingPage";

const NotFound = lazy(() => import("../pages/not-found/notFound"));
const Welcome = lazy(() => import("../pages/welcome/welcomePage"));

const AppRoutes: React.FC = () => {
  const location = useLocation();

  // Obtener el componente deseado de acuerdo con la ruta
  const getPageComponent = () => {
    switch (location.pathname) {
      case paths.index:
        return <Welcome />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingPage />}>{getPageComponent()}</Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
