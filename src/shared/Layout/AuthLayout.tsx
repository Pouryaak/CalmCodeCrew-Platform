import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';
import Layout from './Layout';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <>
    <CssBaseline />
    <Layout>{children}</Layout>
  </>
);

export default AuthLayout;
