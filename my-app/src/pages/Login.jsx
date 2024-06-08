import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Logo from '../assets/images/logo.png';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Gahas2004/EstagBee" target="_blank" rel="noopener noreferrer">
                Estagbee
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container component="main" minWidht="xs">
            <Grid container justifyContent="center" sx={{ padding: "30px" }}>
                <Grid item style={{ textAlign: "center", padding: "20px" }}>
                    <img src={Logo} alt="Logo" />
                </Grid>

                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Typography component="h1" variant="h5" style={{ textAlign: "center", padding: "10px", fontFamily: "Poppins", fontWeight: "bold" }}>
                        Bem-vindo(a) ao Estagbee
                    </Typography>
                </Grid>

                <Box component="form" onSubmit={handleSubmit} noValidate >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField

                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#F6BA04',
                                    '&:hover': {
                                        backgroundColor: '#F6A204', // cor ao passar o mouse
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item xs={6}  style={{justifyContent:"flex-end"}}>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Copyright />
        </Container>
    );
}
export default Login;