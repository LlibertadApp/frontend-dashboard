import React, { useCallback, useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { Trash, ArrowRight } from "@phosphor-icons/react";
import { Selector } from "../../components/selector";
import Button from "../../components/button";
import {
  districtsMock,
  electoralSectionsMock,
  sectionsMock,
  municipalitiesMock,
  establishmentsMock,
  circuitsMock,
  tables,
} from "../../mocks/_mocks";

const FilterPage = () => {
  const { filters, setFilters, clearFilters } = useFilter();
  const [distrito, setDistrito] = useState<string>("");
  const [seccionElectoral, setSeccionElectoral] = useState<string>("");
  const [seccion, setSeccion] = useState<string>("");
  const [municipio, setMunicipio] = useState<string>("");
  const [circuito, setCircuito] = useState<string>("");
  const [establecimiento, setEstablecimiento] = useState<string>("");
  const [mesa, setMesa] = useState<string>("");

  const clearLocalFilters = useCallback(() => {
    setDistrito("");
    setSeccionElectoral("");
    setSeccion("");
    setMunicipio("");
    setCircuito("");
    setEstablecimiento("");
    setMesa("");
  }, []);

  const aplicarFiltros = useCallback(() => {
    // Create an array of filters with the selected values
    const selectedFilters = [
      { id: "distrito", name: "Distrito", value: distrito },
      {
        id: "seccionElectoral",
        name: "Sección Electoral",
        value: seccionElectoral,
      },
      { id: "seccion", name: "Sección", value: seccion },
      { id: "municipio", name: "Municipio", value: municipio },
      { id: "circuito", name: "Circuito", value: circuito },
      {
        id: "establecimiento",
        name: "Establecimiento",
        value: establecimiento,
      },
      { id: "mesa", name: "Mesa", value: mesa },
    ];

    // Set the filters in the context
    setFilters(selectedFilters);
  }, [
    distrito,
    seccionElectoral,
    seccion,
    municipio,
    circuito,
    establecimiento,
    mesa,
    setFilters,
  ]);

  return (
    <>
      <main className="items-center flex flex-col relative px-4">
        <section className="md:w-1/2 w-full rounded-xl z-10 items-end">
          <div className="flex flex-col gap-4 py-2 " id="filter-list">
            <Selector
              label="Distrito"
              onChange={(e) => setDistrito(e.target.value)}
              options={districtsMock}
              value={distrito}
            />
            <Selector
              label="Sección Electoral"
              onChange={(e) => setSeccionElectoral(e.target.value)}
              options={electoralSectionsMock}
              value={seccionElectoral}
            />
            <Selector
              label="Sección"
              onChange={(e) => setSeccion(e.target.value)}
              options={sectionsMock}
              value={seccion}
            />
            <Selector
              label="Municipio"
              onChange={(e) => setMunicipio(e.target.value)}
              options={municipalitiesMock}
              value={municipio}
            />
            <Selector
              label="Circuito"
              onChange={(e) => setCircuito(e.target.value)}
              options={circuitsMock}
              value={circuito}
            />
            <Selector
              label="Establecimiento"
              onChange={(e) => setEstablecimiento(e.target.value)}
              options={establishmentsMock}
              value={establecimiento}
            />
            <Selector
              label="Mesa"
              onChange={(e) => setMesa(e.target.value)}
              options={tables}
              value={mesa}
            />
          </div>
          <div className="flex flex-1 flex-row gap-5 ">
            <Button
              appearance="outlined"
              type="submit"
              label="Limpiar"
              onClick={() => {
                clearLocalFilters();
                clearFilters();
              }}
            >
              Limpiar <Trash size={20} />
            </Button>
            <Button
              appearance="filled"
              type="submit"
              label="Aplicar"
              onClick={aplicarFiltros}
            >
              Aplicar <ArrowRight size={20} />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default FilterPage;
