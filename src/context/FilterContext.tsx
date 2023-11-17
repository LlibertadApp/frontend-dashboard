import { createContext, useContext, ReactNode, useState } from 'react';

export interface Filter {
  id: string;
  name: string;
  value: string;
}

interface FilterContextType {
  menuOpen: boolean;
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  clearFilters: () => void;
  setMenuOpen: (menuOpen: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return (
    <FilterContext.Provider
      value={{ menuOpen, filters, setFilters, clearFilters, setMenuOpen }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters debe ser usado dentro de un FilterProvider');
  }
  return context;
};
