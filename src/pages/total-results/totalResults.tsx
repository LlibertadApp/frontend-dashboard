import { useEffect, useState } from "react";

import { X } from "@phosphor-icons/react";
import axios from 'axios';
import FilterPage from "../../pages/filter-results/filterResults";
import Navbar from "../../components/navbar";
import { Filter, useFilter } from "../../context/FilterContext"; //Cuando esté el formato de la petición para el back, se usa Filter
import { ButtonFilter } from "../../components/buttonFilter";
import { ButtonClearFilter } from "../../components/buttonClearFilter";
import { ListFilters } from "../../components/listFilters";
import Button from "../../components/button";
import { ButtonViewIrregular } from "../../components/buttonViewIrregular/butonViewIrregular";

const TotalResults = () => {



  {/* Interface de declaracion: */}
  interface TotalResultsResponse {
    votesTotal: number; // Asegúrate de que este tipo coincida con la estructura real de la respuesta
    votesPartyA: number;
    votesPartyB: number;
    blank: number;
    impugned: number;
    command: number;
    appealed: number;
    challengedIdentity: number;
    nullVotes: number;
    voters: number;
    voted: number;
    scrutinies: number;
  }



  //(No se que hace esto precisamente)
  let formattedlla: '' | null = null; // Declarada con un valor predeterminado o de tipo null
  let formatteduxp: '' | null = null;

  

  {/* Estados */}
  const { filters, clearFilters, setFilters } = useFilter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [totalResults, setTotalResults] = useState<TotalResultsResponse | null>(null);

  useEffect(() => {


    // Fetch data from your endpoint
    const fetchData = async () => {
      const endpoint = 'https://public-api.libertapp.net/v1/summary';
      try {
        const totalResultsResponse = await axios.get(endpoint);
        console.log(totalResultsResponse.data);
        setTotalResults(totalResultsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  useEffect(() => {
    setFilters(filters);
  }, []);


  const totalVotes = totalResults?.votesTotal ?? 0;
  const participation= totalResults?.voted ?? 0;
  const votes = [totalResults?.votesPartyA ?? 0, totalResults?.votesPartyB ?? 0 ];
  const blank = [totalResults?.blank ?? 0];
  const scrutinies = [totalResults?.scrutinies ?? 0];
  const voted = [totalResults?.voted ?? 0];
  const voters = [totalResults?.voters ?? 0];

  
  const percentages = votes.map((vote) => {
    if (vote !== undefined && totalVotes !== undefined && !isNaN(vote) && !isNaN(totalVotes)) {
      return ((vote / totalVotes) * 100).toFixed(2);
    } else {
      // totalVotes is undefined or nan
      return 'ERR';
    }
  });


//harcodear distrito
  return (
    <div className={`bg-white h-screen flex flex-col ${isFilterMenuOpen ? "overflow-hidden" : ""}`}>
      <Navbar />
      <div className="flex flex-col p-4 sm:px-20 md:px-40 lg:px-60 justify-center items-center">
        <p className="font-bold text-[32px] text-violet-primary mt-[16px] self-center">
          BALOTAJE
        </p>
        {/* Sección de botones */}
        <section className="flex flex-col  sm:flex-row sm:gap-5 pt-8">
          {filters.length > 0 && (<ButtonClearFilter amountOfFilters={filters.length} clearFilters={clearFilters}/>)}
          <button className="-mt-4 sm:mt-0" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
            <ButtonFilter amount={filters.length} />
          </button>
          <button className="-mt-4 sm:mt-0">
          <ButtonViewIrregular amount={filters.length} />
          </button>
        </section>

        <div className="flex self-center">
          <ListFilters filters={filters} />
        </div>


        {/* Menú de filtros (desplegable) */}
        {isFilterMenuOpen && (
          <>
            {/* Overlay que cubre toda la pantalla */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20" onClick={() => setIsFilterMenuOpen(false)}></div>

            {/* Menú emergente */}
            <div className={`fixed bottom-0 left-0 right-0 mx-auto my-auto bg-white p-2 rounded-3xl shadow-md border-t border-gray-300 z-30 transition-all duration-300 backdrop-filter  
            ${isFilterMenuOpen ? "max-h-[82%]" : "h-0" } overflow-y-auto`}>
              <div className="flex flex-row gap-2 justify-between items-center px-4 py-2">
                <p className="font-bold text-[20px] text-violet-brand pt-2">
                  Filtros
                </p>
                <div className="p-4 flex justify-end" onClick={() => setIsFilterMenuOpen(false)}>
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
            <p className={`text-[12px] text-center uppercase text-gray-dark flex items-center`}>
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
        <div className="flex flex-col text-center gap-2">
          <span className="text-sm text-gray-dark">Total de votos</span>
          <span className="text-[22px] font-bold text-text-off">
          {totalVotes}
          </span>
        </div>
        <div className="flex flex-col text-center gap-2">
          <span className="text-sm text-gray-dark">Mesas cargadas</span>
          <span className="text-[22px] font-bold text-text-off">
            {scrutinies}
          </span>
        </div>
        <div className="flex flex-col text-center gap-2">
          <span className="text-sm text-gray-dark">Participacion</span>
          <span className="text-[22px] font-bold text-text-off">
          {voters}
          </span>
        </div>
        <div className="flex flex-col text-center gap-2">
          <span className="text-sm text-gray-dark">Votos en blanco</span>
          <span className="text-[22px] font-bold text-text-off">
          {blank}
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
