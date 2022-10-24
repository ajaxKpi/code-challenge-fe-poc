import * as React from 'react';
import { AuthApi } from '../auth/api/AuthApi';
import { AppBar, Avatar, Box, Button, Toolbar, Tooltip, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';

interface HeaderProps {
    sme: string;
    user: string;
    profileImage: string;
}

export function Header(props: HeaderProps) {
    const navigate = useNavigate();
    function logout() {
        AuthApi.clearLoginToken();
        navigate('/login');
    }

    return <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    {props.sme}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={props.user}>
                        <Avatar alt={props.user} src={props.profileImage}/>
                    </Tooltip>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button sx={{ color: '#fff' }} onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
}
