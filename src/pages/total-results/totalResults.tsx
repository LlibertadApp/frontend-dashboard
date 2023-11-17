import { useEffect, useState } from "react";

import { X } from "@phosphor-icons/react";

import FilterPage from "../../pages/filter-results/filterResults";
import Navbar from "../../components/navbar";
import { Filter, useFilter } from "../../context/FilterContext"; //Cuando esté el formato de la petición para el back, se usa Filter
import { ButtonFilter } from "../../components/buttonFilter";
import { ButtonClearFilter } from "../../components/buttonClearFilter";
import { ListFilters } from "../../components/listFilters";
import Button from "../../components/button";
import { getTotalResults, tablesProgress } from "../../mocks/_mocks";
const TotalResults = () => {
  const { filters, clearFilters, setFilters } = useFilter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    setFilters(filters);
  }, []);
  const totalVotes = getTotalResults[0].voters;
  const votes = [getTotalResults[0].lla, getTotalResults[0].uxp];
  const percentages = votes.map((vote) =>
    ((vote / totalVotes) * 100).toFixed(2)
  );
  const formattedTotalVotes = totalVotes.toLocaleString();
  const formattedlla = getTotalResults[0].lla.toLocaleString();
  const formatteduxp = getTotalResults[0].uxp.toLocaleString();
  const tablesPercentages = (
    (tablesProgress[0].current / tablesProgress[0].totalTables) *
    100
  ).toFixed(2);
  const currentVoted = (
    (getTotalResults[0].voted / getTotalResults[0].voters) *
    100
  ).toFixed(2);
  return (
    <div
      className={`bg-white h-screen flex flex-col ${
        isFilterMenuOpen ? "overflow-hidden" : ""
      }`}
    >
      <Navbar />
      <div className="flex flex-col p-4 lg:px-60 justify-center items-center">
        <p className="font-bold text-[32px] text-violet-primary mt-[16px] self-center">
          BALOTAJE
        </p>
        {/* Sección de botones */}
        <section className="flex gap-5 mb-4 ">
          {filters.length > 0 && (
            <ButtonClearFilter
              amountOfFilters={filters.length}
              clearFilters={clearFilters}
            />
          )}
          <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
            <ButtonFilter amount={filters.length} />
          </button>
        </section>

        <div className="flex self-center">
          <ListFilters filters={filters} />
        </div>

        {/* Menú de filtros (desplegable) */}
        {isFilterMenuOpen && (
          <>
            {/* Overlay que cubre toda la pantalla */}
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
              onClick={() => setIsFilterMenuOpen(false)}
            ></div>

            {/* Menú emergente */}
            <div
              className={`fixed bottom-0 left-0 right-0 mx-auto my-auto bg-white p-2 rounded-3xl shadow-md border-t border-gray-300 z-30 transition-all duration-300 backdrop-filter  ${
                isFilterMenuOpen ? "max-h-[82%]" : "h-0"
              } overflow-y-auto`}
            >
              <div className="flex flex-row gap-2 justify-between items-center px-4 py-2">
                <p className="font-bold text-[20px] text-violet-brand pt-2">
                  Filtros
                </p>
                <div
                  className="p-4 flex justify-end"
                  onClick={() => setIsFilterMenuOpen(false)}
                >
                  <X size={24} />
                </div>
              </div>

              <FilterPage  />
            </div>
          </>
        )}
      </div>
      {/* Candidatos */}
      <div className="lg:px-60 px-3 flex flex-col md:flex-row justify-center items-center gap-6">
        {/* lla */}
        <div className="flex md:flex-col border rounded-2xl md:w-[280px] h-[250px]  justify-between items-center">
          <div className="flex flex-col pl-4 pt-4 pr-4 pb-2 gap-5 items-center">
            <div className="flex flex-col ">
              <img
                src="assets/logos/fenix.png"
                className="w-[100px] h-[80px]"
                alt="La Libertad Avanza Logo"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className={`md:text-[12px] text-[10px] text-gray-dark `}>
                {formattedlla} votos
              </span>
              <p className={`font-bold uppercase text-violet-primary`}>
                {percentages[0]}%
              </p>
            </div>
          </div>
          <div className="flex-col pb-4 pr-4 pl-4 pt-2 items-center ">
            <div className="flex rounded-md h-1 bg-gray-light ">
              <div
                className={`h-full bg-violet-primary rounded-l`}
                style={{ width: `${percentages[0]}%` }}
              ></div>
            </div>
            <p
              className={`justify-center md:text-[18px] text-[13px] font-bold uppercase text-violet-primary flex items-center pt-2`}
            >
              LA LIBERTAD AVANZA
            </p>
            <p
              className={`text-[12px] text-center uppercase text-gray-dark flex items-center`}
            >
              JAVIER MILEI - VICTORIA VILLARRUEL
            </p>
          </div>
        </div>
        {/* uxp */}
        <div className="flex md:flex-col border rounded-2xl md:w-[280px] h-[250px] justify-between items-center">
          <div className="flex flex-col pl-4 pt-4 pr-4 pb-2 gap-5 items-center">
            <div className="flex flex-col ">
              <img
                src="assets/logos/uxp.svg"
                className="w-[100px] h-[80px]"
                alt="La Libertad Avanza Logo"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className={`md:text-[12px] text-[10px] text-gray-dark`}>
                <p>{formatteduxp} votos</p>
              </span>
              <p className={`font-bold uppercase text-party-uxp`}>
                {percentages[1]}%
              </p>
            </div>
          </div>
          <div className="flex-col pb-4 pr-4 pl-4 pt-2 items-center">
            <div className="rounded-md h-1 bg-gray-light">
              <div
                className={`h-full bg-party-uxp rounded-l`}
                style={{ width: `${percentages[1]}%` }}
              ></div>
            </div>
            <p
              className={`md:text-[18px] text-[13px] text-party-uxp font-bold uppercase text-uxp flex items-center justify-center pt-2`}
            >
              UNIÓN POR LA PATRIA
            </p>
            <p
              className={`text-[12px] text-center uppercase text-gray-dark flex items-center `}
            >
              SERGIO TOMÁS MASSA - AGUSTÍN ROSSI
            </p>
          </div>
        </div>
      </div>

      {/* Otros datos */}

      <div className="lg:flex lg:self-center border border-t-1 border-gray-disabled mt-10 lg:w-96 lg:px-72"></div>
      <div className="flex flex-row flex-wrap justify-center items-center px-4 py-5 lg:px-60 gap-10 leading-5 ">
        <div className="flex flex-col ">
          <span className="text-sm text-gray-dark">Total de votos</span>
          <span className="text-[22px] font-bold text-text-off">
            {formattedTotalVotes}%
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-dark">Mesas escrutadas</span>
          <span className="text-[22px] font-bold text-text-off">
            {tablesPercentages}%
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-dark">Participación</span>
          <span className="text-[22px] font-bold text-text-off">
            {currentVoted}%
          </span>
        </div>
      </div>

      <div className="mt-4 p-4 hidden">
        <Button
          className="border-2 border-rose-700 text-rose-700 bg-transparent p-3 w-full rounded-xl text-xl tracking-wider shadow-md hover:border-rose-300 hover:text-rose-300 my-4"
          type="button"
          label="Alerta Irregularidades"
        />
      </div>
    </div>
  );
};

export default TotalResults;
