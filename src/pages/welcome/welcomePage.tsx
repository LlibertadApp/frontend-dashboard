import { useState, lazy } from "react";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
// import { paths } from "../../routes/paths"; Sin usar en está modificacion SPA
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import "./index.css";
import Button from "../../components/button";

const TotalResultsPage = lazy(() => import("../total-results/totalResults"));

const WelcomePage: React.FC = () => {
  const [showTotalResults, setShowTotalResults] = useState(false);


  const handleButtonClick = () => {
    setShowTotalResults(!showTotalResults);
  };

  return (
    <>
      {showTotalResults ? (
        <TotalResultsPage />
      ) : (
        <section>
          <div className="flex flex-col justify-center items-center h-screen bg-violet-brand">
            <div className="flex flex-col justify-center items-center relative text-white py-12">
              <img
                src="assets/logos/fenix-login.svg"
                alt="fenix"
                className="object-cover h-auto w-28 mb-10 mt-24 pt-12"
              />
              <h1 className="text-[32px] font-light text-center whitespace-pre-line">
                Entre todos, <br />
                <strong className="text-white font-semibold break-words">
                  evitemos el fraude.
                </strong>
              </h1>
            </div>
            <div className="img-container relative">
              <Button
                onClick={handleButtonClick}
                className="flex justify-center img-link"
              >
                <div className="overlay rounded-full">
                  <p className="overlay-text">Ingresar</p>
                </div>
                <img
                  src="assets/logos/fenix-login.svg"
                  alt="fenix"
                  className="object-cover h-auto rounded img-item px-[40px]"
                />
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default WelcomePage;
