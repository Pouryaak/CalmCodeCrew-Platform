import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ padding: '10px 10px', margin: '20px' }}>
      <Outlet />
    </Box>
  );
};

export default Layout;
