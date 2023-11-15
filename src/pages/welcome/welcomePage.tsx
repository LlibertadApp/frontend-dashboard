import { useState, lazy } from "react";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import { paths } from "../../routes/paths";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import "./index.css";

const TotalResultsPage = lazy(() => import("../total-results/totalResults"));

const WelcomePage: React.FC = () => {
  const [showTotalResults, setShowTotalResults] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.warn(
        "Animación en curso? ",
        container?.started ? "Si" : "No"
      );
    },
    []
  );

  const handleButtonClick = () => {
    setShowTotalResults(!showTotalResults);
  };

  return (
    <>
      {showTotalResults ? (
        <TotalResultsPage />
      ) : (
        <section>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: "#61439D",
                },
              },
              fpsLimit: 80,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 1,
                  },
                  repulse: {
                    distance: 15,
                    duration: 0.1,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 0.2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center relative text-white ">
              <p className="mb-4">Bienvenido al panel de resultados de</p>
              <h2 className="font-bold text-4xl">LibertApp</h2>
            </div>
            <div className="img-container relative">
              <button
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
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default WelcomePage;
