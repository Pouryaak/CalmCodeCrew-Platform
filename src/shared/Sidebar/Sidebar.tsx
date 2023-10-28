import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/default_routes';
import Divider from '@mui/material/Divider';

const SideBar = ({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menuItems = [
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: <DashboardIcon />,
      to: ROUTES.HOME,
    },
  ];

  const menuItem = (icon, key, title, to) => {
    return (
      <React.Fragment key={key}>
        <ListItem
          component={Link}
          to={to}
          disablePadding
          sx={{ color: 'inherit' }}
          onClick={() => setVisibility(false)}
        >
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
      </React.Fragment>
    );
  };

  return (
    <Drawer open={visibility} onClose={() => setVisibility(false)}>
      <Box sx={{ width: 300 }} role="presentation">
        <List>
          {menuItems.map((item) =>
            menuItem(item.icon, item.key, item.title, item.to),
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
