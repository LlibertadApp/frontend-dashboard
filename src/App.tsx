import AppRoutes from "./routes/routes";
import "./App.css";
import { LoadingPage } from "./pages/loading-page";
import { FilterProvider } from "./context/FilterContext";
import { HamburgerProvider } from "./context/HamburgerContext";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <HamburgerProvider>
          <FilterProvider>
            <AppRoutes />
          </FilterProvider>
        </HamburgerProvider>
      </Suspense>
    </>
  );
}

export default App;
