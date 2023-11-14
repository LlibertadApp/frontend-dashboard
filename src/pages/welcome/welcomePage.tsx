import React from "react";
import { paths } from "../../routes/paths";
const welcomePage: React.FC = () => {
  return (
    <>
      <section className="h-screen">
        <div className="flex flex-col justify-center items-center h-full">
          <p>Bienvenido al panel de resultados de</p>
          <h2 className=" font-bold text-4xl">LibertApp</h2>
          <a href={paths.totalResults}>
            <button> Ingresar</button>
          </a>
        </div>
      </section>
    </>
  );
};

export default welcomePage;
