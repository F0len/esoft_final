import React from 'react';
import Navbar from './Navbar';
import { Outlet} from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = ({roles}) => {
    console.log(roles);
    return (
        <>
            <Navbar roles={roles} />
            <Box sx={{ pl: 2, pr: 2 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default MainLayout;