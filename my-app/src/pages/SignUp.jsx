import * as React from 'react';
import { useState } from 'react';
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

export function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstNameValue = data.get('firstName');
        const lastNameValue = data.get('lastName');
        const emailValue = data.get('email');
        const passwordValue = data.get('password');

        setFirstNameError(!firstNameValue);
        setLastNameError(!lastNameValue);
        setEmailError(!emailValue);
        setPasswordError(!passwordValue);

        if (firstNameValue && lastNameValue && emailValue && passwordValue) {
            console.log({
                firstName: firstNameValue,
                lastName: lastNameValue,
                email: emailValue,
                password: passwordValue,
            });
        }
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

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={firstNameError}
                                helperText={firstNameError ? 'First name is required' : ''}
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setFirstNameError(!e.target.value);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={lastNameError}
                                helperText={lastNameError ? 'Last name is required' : ''}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    setLastNameError(!e.target.value);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={emailError}
                                helperText={emailError ? 'Email is required' : ''}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(!e.target.value);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={passwordError}
                                helperText={passwordError ? 'Password is required' : ''}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(!e.target.value);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    backgroundColor: '#F6BA04',
                                    '&:hover': {
                                        backgroundColor: '#F6A204', // cor ao passar o mouse
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
                <Grid container>
                    <Grid item xs={12} style={{ textAlign: "right", marginTop: "10px" }}>
                        <Link href="/" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Grid>

            <Copyright />
        </Container>
    );
}

export default SignUp;
