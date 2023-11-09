import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

import logo from '../../src/d.png';

const Sidebar = () => {
  const currentPath = window.location.pathname;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Accounts', icon: <AccountBalanceIcon />, path: '/accounts' },
    { text: 'Payroll', icon: <MoneyIcon />, path: '/payroll' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
    { text: 'Advisor', icon: <PersonIcon />, path: '/advisor' },
    { text: 'Contacts', icon: <ContactMailIcon />, path: '/contacts' },
  ];

  const getActiveStyle = (path) => ({
    backgroundColor: currentPath === path ? '#14C503' : 'transparent',
   fontColor:'white'
  });

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem>
          <img src={logo} alt="Logo" />
        </ListItem>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            style={{
              ...getActiveStyle(item.path),
              color: getActiveStyle(item.path).backgroundColor === '#14C503' ? 'white' : 'black',
            }}
            onClick={() => window.location.href = item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
