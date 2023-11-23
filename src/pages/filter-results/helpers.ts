import { CircuitoResponse, DistritoResponse } from '#/services/tables';
import { Key } from 'react';

export const getElectoralSectionsFromDistritoObject = (distritoObject: DistritoResponse) => {

  return Object.values(distritoObject.seccionprovincial).map((seccionProvincial) => ({
    key: seccionProvincial.seccionprovincial_id,
    label: seccionProvincial.seccionprovincial_nombre ?? 'Primera',
  }));
};

export const getSectionsByElectoralSectionId = (distritoObject: DistritoResponse, electoralSectionId: Key) => {
  return Object.values(distritoObject.seccionprovincial[Number(electoralSectionId)].secciones).map((seccion) => ({
    key: seccion.seccion_id,
    label: seccion.seccion_nombre ?? 'Primera',
  }));
};

export const getCircuitsBySectionId = (distritoObject: DistritoResponse, electoralSectionId: Key, sectionId: Key) => {
  return Object.values(distritoObject.seccionprovincial[Number(electoralSectionId)].secciones[Number(sectionId)].circuitos).map((circuito) => ({
    key: circuito.circuito_id,
    label: circuito.circuito_nombre ?? 'Primera',
  }));
};

export const getEstablishmentsByCircuitObject = (circuitObject: CircuitoResponse) => {
  return Object.values(circuitObject.colegios).map((colegio) => ({ key: colegio.id_colegio, label: colegio.colegio ?? 'Primera' }));
};

export const getMesasByEstablishmentId = (circuitObject: CircuitoResponse, establishment: Key) => {
  const colegio = circuitObject.colegios.find((colegio) => colegio.id_colegio == establishment);
  return colegio?.mesas.map((mesa) => ({ key: mesa.uid_mesa, label: mesa.identificador_unico_mesa })) ?? [];
};
