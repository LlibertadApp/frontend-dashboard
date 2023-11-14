import TotalResults from '../pages/total-results/totalResults';
import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { paths } from './paths';


const TotalResultsPage = lazy(() => import('../pages/total-results/totalResults'))


const AppRoutes: React.FC = () => {
    const location = useLocation();
    return (

        <Routes location={location} key ={location.pathname}>

            <Route path={paths.index} element={<TotalResultsPage/>} />
        
        </Routes>

    )
}


export default AppRoutes;