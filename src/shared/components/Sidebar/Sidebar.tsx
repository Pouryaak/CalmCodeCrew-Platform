import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/default_routes';
import { RootState } from '../../../store/store';
import { IMenuItem } from './Sidebar.models';

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
    {
      title: 'Certificates',
      key: 'certificates',
      icon: <CardMembershipIcon />,
      to: ROUTES.CERTIFICATES,
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
