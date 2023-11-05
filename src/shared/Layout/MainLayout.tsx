import CssBaseline from '@mui/material/CssBaseline';
import Menubar from '../components/Menubar/Menubar.js';
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
