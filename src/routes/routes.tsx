import TotalResults from '../pages/total-results/totalResults';
import FilterResults from '../pages/filter-results/filterResults'
import NotFound from '../pages/not-found/notFound'
import Welcome from '../pages/welcome/welcomePage'
import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { paths } from './paths';


const TotalResultsPage = lazy(() => import('../pages/total-results/totalResults'))


const AppRoutes: React.FC = () => {
    const location = useLocation();
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFound />} />
        <Route path={paths.index} element={<Welcome />} />
        <Route path={paths.filterResults} element={<FilterResults />} />
        <Route path={paths.totalResults} element={<TotalResults />} />
      </Routes>
    );
}


export default AppRoutes;