import { Route, Routes } from 'react-router-dom';
import HomePage from '../views/HomePage/HomePage';
import { ROUTES } from './default_routes';
import AuthenticationPage from '../views/AuthenticationPage/AuthenticationPage';
import MainLayout from '../shared/Layout/MainLayout';
import AuthLayout from '../shared/Layout/AuthLayout';
import PrivateRoute from '../features/Authentication/PrivateRoute/PrivateRoute';
import PublicRoute from '../features/Authentication/PublicRoute/PublicRoute';
import WorkshopsPage from '../views/WorkshopsPage/WorkshopsPage';
import WorkshopDetails from '../views/WorkshopsPage/WorkshopDetails.page';

const DefaultRoutes = (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.WORKSHOPS} element={<WorkshopsPage />} />
        <Route path={ROUTES.ADD_WORKSHOP} element={<WorkshopDetails />} />
        <Route path={ROUTES.EDIT_WORKSHOP} element={<WorkshopDetails />} />
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
