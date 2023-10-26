import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import HomePage from '../views/HomePage/HomePage';
import { ROUTES } from './default_routes';

const DefaultRoutes = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </>
  );
};

export default DefaultRoutes;
