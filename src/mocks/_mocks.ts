export const districtsMock = [
  { key: 1, label: "Ciudad Autónoma de Buenos Aires" },
  { key: 2, label: "Provincia de Buenos Aires" },
  { key: 3, label: "Córdoba" },
];

export const electoralSectionsMock = [
  { key: 1, label: "CABA" },
  { key: 2, label: "GBA" },
  { key: 3, label: "Córdoba" },
];

export const sectionsMock = [
  { key: 1, label: "Barrio Norte" },
  { key: 2, label: "La Plata" },
  { key: 3, label: "Villa María" },
];

export const municipalitiesMock = [
  { key: 1, label: "Avellaneda" },
  { key: 2, label: "Rosario" },
  { key: 3, label: "San Isidro" },
];

export const establishmentsMock = [
  { key: 1, label: "Escuela 101" },
  { key: 2, label: "Colegio 202" },
  { key: 3, label: "Instituto 303" },
];

export const circuitsMock = [
  { key: 1, label: "Circuito Norte" },
  { key: 2, label: "Circuito Sur" },
  { key: 3, label: "Circuito Oeste" },
];

export const tables = [
  { key: 1, label: "Mesa 034" },
  { key: 2, label: "Mesa 052" },
  { key: 3, label: "Mesa 128" },
];

export const getFilteredResults = [
  {
    combination1: [
      "Ciudad Autónoma de Buenos Aires",
      "Sección Capital 1",
      "Barrio Norte",
      "Avellaneda",
      "Escuela 101",
      "Circuito Norte",
      "Mesa 034",
    ],
    totalVotes: {
      uxp: 50,
      lla: 125,
      blank: 0,
      null: 0,
      disputed: 0,
      identity: 0,
      command: 0,
    },
  },
  {
    combination2: [
      "Provincia de Buenos Aires",
      "Sección GBA 2",
      "La Plata",
      "Rosario",
      "Colegio 202",
      "Circuito Sur",
      "Mesa 052",
    ],
    totalVotes: {
      uxp: 50,
      lla: 125,
      blank: 0,
      null: 0,
      disputed: 0,
      identity: 0,
      command: 0,
    },
  },
  {
    combination3: [
      "Córdoba",
      "Sección Córdoba 3",
      "Villa María",
      "San Isidro",
      "Instituto 303",
      "Circuito Oeste",
      "Mesa 128",
    ],
    totalVotes: {
      uxp: 50,
      lla: 125,
      blank: 0,
      null: 0,
      disputed: 0,
      identity: 0,
      command: 0,
    },
  },
];

export const getTotalResults = [
  {
    voters: 26219718,
    voted: 26200000,
    uxp: 5508139,
    lla: 17548468,
    blank: 3131111,
    null: 3131111,
    disputed: 3131111,
    identity: 3131111,
    command: 3131111,
  },
];
export const tablesProgress = [
  {
    totalTables: 104520,
    current: 95900,
  },
];
