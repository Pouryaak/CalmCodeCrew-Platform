import CssBaseline from '@mui/material/CssBaseline';
import Menubar from '../../shared/Menubar/Menubar.jsx';
import { Outlet } from 'react-router-dom';
import Layout from './Layout.js';

const MainLayout: React.FC = () => (
  <>
    <CssBaseline />
    <Menubar />
    <Layout>
      <Outlet />
    </Layout>
  </>
);

export default MainLayout;
