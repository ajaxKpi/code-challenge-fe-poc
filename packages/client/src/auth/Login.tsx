import * as React from "react";
import { SyntheticEvent, useState } from "react";
import { Navigate } from 'react-router-dom'
import { AuthApi } from './api/AuthApi';
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';

export function Login() {
    const [userName, handleUserName] = useState('');
    const [userPass, handleUserPass] = useState('');
    const [isLoginIn, handleLoginStatus] = useState(false);
    const [hasAuthError, handleAuthError] = useState(false);

    async function loginUser() {
        await AuthApi.login(userName, userPass)
            .then(() => handleLoginStatus(true))
            .catch(() => handleAuthError(true));
    }

    function handleUserNameChange(event: SyntheticEvent) {
        event.persist();
        handleUserName((event.target as HTMLInputElement).value);
    }

    function handleUserPassChange(event: SyntheticEvent) {
        event.persist();
        handleUserPass((event.target as HTMLInputElement).value);
    }

    return isLoginIn
        ? <Navigate to='/dashboard'/>
        : <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/cwalokkeekfshxqxrrly"
                    sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            value={userName}
                            onChange={handleUserNameChange}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            value={userPass}
                            onChange={handleUserPassChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    onClick={loginUser}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>

                {
                    hasAuthError
                        ? <Alert severity="error">Wrong email or password</Alert>
                        : null
                }

            </Box>
        </Container>
}
