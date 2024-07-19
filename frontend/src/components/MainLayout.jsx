import React from 'react';
import Navbar from './Navbar';
import { Outlet} from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ pl: 4, pr: 4 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default MainLayout;