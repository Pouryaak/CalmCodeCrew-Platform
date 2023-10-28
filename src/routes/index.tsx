import { Route, Routes } from 'react-router-dom';
import HomePage from '../views/HomePage/HomePage';
import { ROUTES } from './default_routes';
import AuthenticationPage from '../views/AuthenticationPage/AuthenticationPage';

const DefaultRoutes = (
  <Routes>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.AUTHENTICATION} element={<AuthenticationPage />} />
  </Routes>
);
export default DefaultRoutes;
