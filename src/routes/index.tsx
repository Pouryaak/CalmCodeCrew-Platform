import { Route, Routes } from 'react-router-dom';
import HomePage from '../views/HomePage/HomePage';
import { ROUTES } from './default_routes';
import AuthenticationPage from '../views/AuthenticationPage/AuthenticationPage';
import MainLayout from '../shared/Layout/MainLayout';
import AuthLayout from '../shared/Layout/AuthLayout';

const DefaultRoutes = (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
    </Route>
    <Route
      path={ROUTES.AUTHENTICATION}
      element={
        <AuthLayout>
          <AuthenticationPage />
        </AuthLayout>
      }
    />
  </Routes>
);
export default DefaultRoutes;
