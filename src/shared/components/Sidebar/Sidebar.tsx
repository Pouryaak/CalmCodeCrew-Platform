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
import { ROUTES } from '../../../routes/default_routes';
import Divider from '@mui/material/Divider';
import { IMenuItem } from './Sidebar.models';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const SideBar = ({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  const menuItems: IMenuItem[] = [
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: <DashboardIcon />,
      to: ROUTES.HOME,
      roles: ['admin', 'participant'],
    },
    {
      title: 'Workshops',
      key: 'workshop',
      icon: <Diversity3Icon />,
      to: ROUTES.WORKSHOPS,
      roles: ['admin'],
    },
  ];

  const accessibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole!),
  );

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
          {accessibleMenuItems.map((item) =>
            menuItem(item.icon, item.key, item.title, item.to),
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
