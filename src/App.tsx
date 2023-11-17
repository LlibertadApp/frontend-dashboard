import AppRoutes from './routes/routes';
import './App.css';
import { FilterProvider } from './context/FilterContext';
import { HamburgerProvider } from './context/HamburgerContext';

function App() {
  return (
    <HamburgerProvider>
      <FilterProvider>
        <AppRoutes />
      </FilterProvider>
    </HamburgerProvider>
  );
}

export default App;
