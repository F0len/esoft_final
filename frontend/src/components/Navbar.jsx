import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const MyAppBar = ({roles}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(roles);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  const handleAdminMenuOpen = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', mb: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <SchoolIcon />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', ml: 2 }}>
          {['admin'].some(role => roles.includes(role)) &&
          <>
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
            <MenuItem onClick={() => { handleAdminMenuClose(); navigate('/admin/users'); }}>Пользователи</MenuItem>
            <MenuItem onClick={() => { handleAdminMenuClose(); navigate('/admin/courses'); }}>Курсы</MenuItem>
          </Menu>
          </>
          }
          
          <Button color="inherit" onClick={() => navigate('/courses')}>Курсы</Button>
          <Button color="inherit" onClick={() => navigate('/my-courses')}>Мои курсы</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar/>
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
            <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
