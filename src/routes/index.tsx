import { Route, Routes } from 'react-router-dom';
import HomePage from '../views/HomePage/HomePage';
import { ROUTES } from './default_routes';
import AuthenticationPage from '../views/AuthenticationPage/AuthenticationPage';
import Layout from '../shared/Layout/Layout';

const DefaultRoutes = (
  <Routes>
    <Route element={<Layout />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.AUTHENTICATION} element={<AuthenticationPage />} />
    </Route>
  </Routes>
);
export default DefaultRoutes;
