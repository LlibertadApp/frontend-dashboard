import React, { Key, useCallback, useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { Selector } from "../../components/selector";
import { CircuitoResponse, DistritoResponse, distritos, getCircuitoById, getDistritoById } from "../../services/tables";
import { getCircuitsBySectionId, getElectoralSectionsFromDistritoObject, getEstablishmentsByCircuitObject, getMesasByEstablishmentId, getSectionsByElectoralSectionId } from "./helpers";
import Button from "../../components/button";
import { ArrowRight, Trash } from "@phosphor-icons/react";

export type KeyValue  ={ key: Key; label: string }
export type KeyValueOrNull = KeyValue | null;

type distrito = keyof typeof distritos;


const FilterPage: React.FC = () => {

  const { filters, setFilters, clearFilters } = useFilter();

  const [district, setDistrict] = useState<KeyValueOrNull>(null);

  const [electoralSections, setElectoralSections] = useState<KeyValue[]>([]);
  const [electoralSection, setElectoralSection] = useState<KeyValueOrNull>(null);
  const [section, setSection] = useState<KeyValueOrNull>(null);
  const [sections, setSections] = useState<KeyValue[]>([]);
  const [circuit, setCircuit] = useState<KeyValueOrNull>(null);
  const [circuits, setCircuits] = useState<KeyValue[]>([]);
  const [establishment, setEstablishment] = useState<KeyValueOrNull>(null);
  const [establishments, setEstablishments] = useState<KeyValue[]>([]);
  const [tables, setTables] = useState<KeyValue[]>([]);
  const [table, setTable] = useState<KeyValueOrNull>(null)

  const [distritoCompleteObject, setDistritoCompleteObject] = useState<DistritoResponse | null>(null);
  const [circuitCompleteObject, setCircuitCompleteObject] = useState<CircuitoResponse | null>(null);
  
  const clearLocalFilters = () => {
    setDistrict(null);
    setElectoralSection(null)
    setSection(null);
    setCircuit(null);
    setEstablishment(null);
    setTable(null);
  }

  const aplicarFiltros = () => {
    setFilters([
      {
        id: "N° Distrito",
        name: "Distrito",
        value: district?.label ?? '',
      },
      {
        id: "N° seccionElectoral",
        name: "Sección Electoral",
        value:electoralSection?.label ?? '',
      },
      {
        id: "N° seccion",
        name: "Sección",
        value:section?.label ?? '',
      },
      {
        id: "N° circuito",
        name: "Circuito",
        value:circuit?.label ?? ''
      },
      {
        id: "N° establecimiento",
        name: "Establecimiento",
        value:establishment?.label ?? ''
      },
      {
        id: "N° mesa",
        name: "Mesa",
        value: table?.label ?? ''
      },
    ]);
  }

  const [error, setError] = useState(false);
  const [loadingDistritoObject, setLoadingDistritoObject] = useState(false);
  const [loadingCircuitObject, setLoadingCircuitObject] = useState(false);

  const districtOnSelectionChange = (newDistrict: KeyValue) => {
    const selectedDistrictValue = distritos[newDistrict.key as distrito];
    setDistrict((prev) => {
      if (prev?.key !== newDistrict.key) {
        setDistritoCompleteObject(null);
        setElectoralSection(null);
        setSection(null);
        setCircuit(null);
        setCircuitCompleteObject(null);
        setEstablishment(null);
      }
      if(!newDistrict.label) newDistrict.label = selectedDistrictValue
      return newDistrict;
    });
  };

  const getDistrictData = useCallback(async () => {
    if (district) {
      setLoadingDistritoObject(true);
      setError(false);
      try {
        const distritoCompleteObject = await getDistritoById(district.key);
        setDistritoCompleteObject(distritoCompleteObject);
        console.log(distritoCompleteObject)
        setElectoralSections(getElectoralSectionsFromDistritoObject(distritoCompleteObject));
      } catch (error) {
        setError(true);
      } finally {
        setLoadingDistritoObject(false);
      }
    } else {
      setElectoralSections([]);
    }
  }, [district]);

  useEffect(() => {
    getDistrictData();
  }, [getDistrictData]);

  const electoralSectionOnSelectionChange = useCallback(
    (newElectoralSection: KeyValue) => {
      const selectedElectoralSection = electoralSections.find((es) => es.key == newElectoralSection.key);
      setElectoralSection((prev) => {
        if (newElectoralSection) {
          if (newElectoralSection.label === null) {
            newElectoralSection.label = 'Primera';
          }
          if (prev?.key !== newElectoralSection.key) {
            setSection(null);
            setCircuit(null);
            setCircuitCompleteObject(null);
            setEstablishment(null);
          }
          if(!newElectoralSection.label) newElectoralSection.label = selectedElectoralSection?.label ?? 'Primera'
          return newElectoralSection;
        } else {
          setSection(null);
          setCircuit(null);
          setCircuitCompleteObject(null);
          setEstablishment(null);
          return null;
        }
      });
    },
    [electoralSections]
  );

  useEffect(() => {
    if (electoralSection?.key && !electoralSection?.label && electoralSections?.length) {
      electoralSectionOnSelectionChange(electoralSection);
    }
  }, [electoralSections, electoralSectionOnSelectionChange]);

  useEffect(() => {
    if (distritoCompleteObject && electoralSection) {
      setSections(getSectionsByElectoralSectionId(distritoCompleteObject, electoralSection.key));
    } else {
      setSections([]);
    }
  }, [electoralSection, distritoCompleteObject]);

  const sectionOnSelectionChange = useCallback(
    (newSection: KeyValue) => {
      setSection((prev) => {
        const selectedSection = sections.find((sc) => sc.key == newSection.key);
        if (selectedSection) {
          if (selectedSection.label === null) {
            selectedSection.label = 'Primera';
          }
          if (prev?.key !== newSection.key) {
            setCircuit(null);
            setCircuitCompleteObject(null);
            setEstablishment(null);
          }
          if(!newSection.label) newSection.label = selectedSection.label;
          return newSection;
        } else {
          setCircuit(null);
          setCircuitCompleteObject(null);
          setEstablishment(null);
          return null;
        }
      });
    },
    [sections]
  );

  useEffect(() => {
    if (section?.key && !section?.label && sections?.length) {
      sectionOnSelectionChange(section);
    }
  }, [sections, sectionOnSelectionChange]);

  useEffect(() => {
    if (section && distritoCompleteObject && electoralSection) {
      setCircuits(getCircuitsBySectionId(distritoCompleteObject, electoralSection.key, section.key));
    } else {
      setCircuits([]);
    }
  }, [section, electoralSection, distritoCompleteObject]);

  const circuitOnSelectionChange = (newCircuit: KeyValue) => {
    setCircuit((prev) => {
      const selectedCircuit = circuits.find((ci) => ci.key == newCircuit.key);
      if (selectedCircuit) {
        if (selectedCircuit.label === null) {
          selectedCircuit.label = 'Primera';
        }
        if (prev?.key !== newCircuit.key) {
          setCircuitCompleteObject(null);
          setEstablishment(null);
        }
        if(!newCircuit.label) newCircuit.label = selectedCircuit.label
        return newCircuit;
      } else {
        setCircuitCompleteObject(null);
        setEstablishment(null);
        return null;
      }
    });
  };

  const getCircuitData = useCallback(async (district: Key, electoralSection: Key, section: Key, circuit: Key) => {
    setLoadingCircuitObject(true);
    try {
      setError(false);
      const circuitData = await getCircuitoById(district, electoralSection, section, circuit);
      setCircuitCompleteObject(circuitData);
      setEstablishments(getEstablishmentsByCircuitObject(circuitData));
    } catch (error) {
      setError(true);
    } finally {
      setLoadingCircuitObject(false);
    }
  }, []);

  useEffect(() => {
    if (circuit?.key && !circuit?.label && circuits?.length) {
      circuitOnSelectionChange(circuit);
    }
  }, [circuits, circuitOnSelectionChange]);

  useEffect(() => {
    if (circuit && district && electoralSection && section && circuit) {
      getCircuitData(district.key, electoralSection.key, section.key, circuit.key);
    } else {
      setEstablishments([]);
    }
  }, [circuit, section, electoralSection, district]);

  const establishmentOnSelectionChange = useCallback(
    (newEstablishment: KeyValue) => {
      const selectedEstablishment = establishments.find((es) => es.key == newEstablishment.key);
      if (selectedEstablishment) {
        if (!newEstablishment.label) newEstablishment.label = establishment?.label ?? 'Primera';
        setEstablishment(newEstablishment);
      } else {
        setEstablishment(null);
      }
    },
    [establishments]
  );

  useEffect(() => {
    if (establishment?.key && !establishment?.label && establishments?.length) {
      establishmentOnSelectionChange(establishment);
    }
  }, [establishments, establishmentOnSelectionChange]);

  useEffect(() => {
    if (establishment && circuitCompleteObject) {
      setTables(getMesasByEstablishmentId(circuitCompleteObject, establishment.key));
    } else {
      setTables([]);
    }
  }, [establishment]);

  return (
    <>
      <main className="items-center flex flex-col relative px-4">
        <section className="md:w-1/2 w-full rounded-xl z-10 items-end">
          <div className="flex flex-col gap-4 py-2 " id="filter-list">
            <Selector
              label="Distrito"
              onChange={(e) => districtOnSelectionChange(e)}
              options={Object.entries(distritos).map(([key, value]) => ({ key: Number(key), label: value }))}
              value={district}
            />
            <Selector
              label="Sección Electoral"
              onChange={(e) => electoralSectionOnSelectionChange(e)}
              options={electoralSections}
              value={electoralSection}
            />
            <Selector
              label="Sección"
              onChange={(e) => sectionOnSelectionChange(e)}
              options={sections}
              value={section}
            />
            <Selector
              label="Circuito"
              onChange={(e) => circuitOnSelectionChange(e)}
              options={circuits}
              value={circuit}
            />
            <Selector
              label="Establecimiento"
              onChange={(e) => establishmentOnSelectionChange(e)}
              options={establishments}
              value={establishment}
            />
            <Selector
              label="Mesa"
              onChange={(e) => setTable(e)}
              options={tables}
              value={table}
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
