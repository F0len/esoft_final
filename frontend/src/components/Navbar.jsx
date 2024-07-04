import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const MyAppBar = ({ anchorEl, handleMenu, handleClose, handleLogout }) => {
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  const handleAdminMenuOpen = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <SchoolIcon/>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', ml: 2 }}>
          <Button
            color="inherit"
            onClick={handleAdminMenuOpen}
          >
            Администрирование
          </Button>
          <Menu
            anchorEl={adminAnchorEl}
            open={Boolean(adminAnchorEl)}
            onClose={handleAdminMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleAdminMenuClose}>Пользователи</MenuItem>
            <MenuItem onClick={handleAdminMenuClose}>Курсы</MenuItem>
          </Menu>
          <Button color="inherit">Курсы</Button>
          <Button color="inherit">Мои курсы</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
