import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../features/Authentication/PrivateRoute/PrivateRoute';
import PublicRoute from '../features/Authentication/PublicRoute/PublicRoute';
import AuthLayout from '../shared/Layout/AuthLayout';
import MainLayout from '../shared/Layout/MainLayout';
import AuthenticationPage from '../views/AuthenticationPage/AuthenticationPage';
import CertificatesPage from '../views/CertificatesPage/CertificatesPage';
import HomePage from '../views/HomePage/HomePage';
import UsersPage from '../views/UsersPage/UsersPage';
import WorkshopDetails from '../views/WorkshopsPage/WorkshopDetails.page';
import WorkshopsPage from '../views/WorkshopsPage/WorkshopsPage';
import { ROUTES } from './default_routes';

const DefaultRoutes = (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.WORKSHOPS} element={<WorkshopsPage />} />
        <Route path={ROUTES.ADD_WORKSHOP} element={<WorkshopDetails />} />
        <Route path={ROUTES.EDIT_WORKSHOP} element={<WorkshopDetails />} />
        <Route path={ROUTES.CERTIFICATES} element={<CertificatesPage />} />
        <Route path={ROUTES.USERS} element={<UsersPage />} />
      </Route>
    </Route>

    <Route
      path={ROUTES.AUTHENTICATION}
      element={
        <PublicRoute>
          <AuthLayout>
            <AuthenticationPage />
          </AuthLayout>
        </PublicRoute>
      }
    />
  </Routes>
);
export default DefaultRoutes;
