import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Logo from '../../assets/images/logo.png';

export function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Regex para validar email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        // Regex para validar senha com pelo menos 6 caracteres, incluindo uma letra maiúscula
        const re = /^(?=.*[A-Z]).{6,}$/;
        return re.test(password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstNameValue = data.get('firstName');
        const lastNameValue = data.get('lastName');
        const emailValue = data.get('email');
        const passwordValue = data.get('password');

        let valid = true;

        if (!firstNameValue) {
            setFirstNameError(true);
            valid = false;
        } else {
            setFirstNameError(false);
        }

        if (!lastNameValue) {
            setLastNameError(true);
            valid = false;
        } else {
            setLastNameError(false);
        }

        if (!emailValue) {
            setEmailError(true);
            setEmailErrorMessage('Email is required');
            valid = false;
        } else if (!validateEmail(emailValue)) {
            setEmailError(true);
            setEmailErrorMessage('Invalid email address');
            valid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!passwordValue) {
            setPasswordError(true);
            setPasswordErrorMessage('Password is required');
            valid = false;
        } else if (!validatePassword(passwordValue)) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters and include an uppercase letter');
            valid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (valid) {
            console.log({
                firstName: firstNameValue,
                lastName: lastNameValue,
                email: emailValue,
                password: passwordValue,
            });
            navigate('/home');
        }
    };

    return (

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
                            helperText={emailError ? emailErrorMessage : ''}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) {
                                    setEmailError(!validateEmail(e.target.value));
                                    setEmailErrorMessage('Invalid email address');
                                } else {
                                    setEmailErrorMessage('');
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={passwordError}
                            helperText={passwordError ? passwordErrorMessage : ''}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (passwordError) {
                                    setPasswordError(!validatePassword(e.target.value));
                                    setPasswordErrorMessage('Password must be at least 6 characters and include an uppercase letter');
                                } else {
                                    setPasswordErrorMessage('');
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
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



    );
}

export default SignUp;
