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

interface FilterPageProps {
  setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterPage: React.FC<FilterPageProps> = ({ setIsFilterMenuOpen }) => {
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
    !distrito &&
    !seccionElectoral &&
    !seccion &&
    !municipio &&
    !circuito &&
    !establecimiento &&
    !mesa
      ? null
      : (setFilters([
          {
            id: "N° Distrito",
            name: "Distrito",
            value:
              districtsMock.find((d) => d.key === parseInt(distrito))?.label ||
              "",
          },
          {
            id: "N° seccionElectoral",
            name: "Sección Electoral",
            value:
              electoralSectionsMock.find(
                (e) => e.key === parseInt(seccionElectoral)
              )?.label || "",
          },
          {
            id: "N° seccion",
            name: "Sección",
            value:
              sectionsMock.find((s) => s.key === parseInt(seccion))?.label ||
              "",
          },
          {
            id: "N° municipio",
            name: "Municipio",
            value:
              municipalitiesMock.find((m) => m.key === parseInt(municipio))
                ?.label || "",
          },
          {
            id: "N° circuito",
            name: "Circuito",
            value:
              circuitsMock.find((c) => c.key === parseInt(circuito))?.label ||
              "",
          },
          {
            id: "N° establecimiento",
            name: "Establecimiento",
            value:
              establishmentsMock.find(
                (e) => e.key === parseInt(establecimiento)
              )?.label || "",
          },
          {
            id: "N° mesa",
            name: "Mesa",
            value: tables.find((t) => t.key === parseInt(mesa))?.label || "",
          },
        ]),
        setIsFilterMenuOpen(false));
  }, [
    distrito,
    seccionElectoral,
    seccion,
    municipio,
    circuito,
    establecimiento,
    mesa,
    setFilters,
    setIsFilterMenuOpen,
  ]);

  return (
    <>
      <main className="items-center flex flex-col relative px-4">
        <section className="md:w-1/2 w-full rounded-xl z-10 items-end">
          <div className="flex flex-col gap-4 py-2 " id="filter-list">
            <Selector
              label="Distrito"
              onChange={(e) => setDistrito(e.target.value)} //@ts-ignore
              options={districtsMock}
              value={distrito}
            />
            <Selector
              label="Sección Electoral"
              onChange={(e) => setSeccionElectoral(e.target.value)} //@ts-ignore
              options={electoralSectionsMock}
              value={seccionElectoral}
            />
            <Selector
              label="Sección"
              onChange={(e) => setSeccion(e.target.value)} //@ts-ignore
              options={sectionsMock}
              value={seccion}
            />
            <Selector
              label="Municipio"
              onChange={(e) => setMunicipio(e.target.value)} //@ts-ignore
              options={municipalitiesMock}
              value={municipio}
            />
            <Selector
              label="Circuito"
              onChange={(e) => setCircuito(e.target.value)} //@ts-ignore
              options={circuitsMock}
              value={circuito}
            />
            <Selector
              label="Establecimiento"
              onChange={(e) => setEstablecimiento(e.target.value)} //@ts-ignore
              options={establishmentsMock}
              value={establecimiento}
            />
            <Selector
              label="Mesa"
              onChange={(e) => setMesa(e.target.value)} //@ts-ignore
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
