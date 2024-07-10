import React from 'react';
import Navbar from './Navbar';
import { Outlet} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const MainLayout = () => {
    return (
        <>
        <CssBaseline />
            <Navbar />
            <Outlet />
        </>
    );
};

export default MainLayout;