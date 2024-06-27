import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export function SignUp({type}) {
    const [name, setName] = useState('');
    const [ra, setRa] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [raError, setRaError] = useState(false);
    const [courseError, setCourseError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z]).{6,}$/;
        return re.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const nameValue = data.get('name');
        const raValue = data.get('ra');
        const courseValue = data.get('course');
        const emailValue = data.get('login_credential');
        const passwordValue = data.get('password');

        let valid = true;

        if (!nameValue) {
            setNameError(true);
            valid = false;
        } else {
            setNameError(false);
        }
        if (!raValue) {
            setRaError(true);
            valid = false;
        } else {
            setRaError(false);
        }

        if (!courseValue) {
            setCourseError(true);
            valid = false;
        } else {
            setCourseError(false);
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
            try {
                const response = await axios.post('http://localhost:8000/user/student/register', {
                    name: nameValue,
                    course: courseValue,
                    login_credential: emailValue,
                    password: passwordValue,
                    ra: raValue
                });
                //colocar os valores no localstorage
                navigate('/');
            } catch (error) {
                console.error('There was an error registering the student!', error);
            }
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
                            error={nameError}
                            helperText={nameError ? 'Nome é obrigatório' : ''}
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Nome do aluno"
                            autoFocus
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameError(!e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={raError}
                            helperText={raError ? 'RA é obrigatório' : ''}
                            autoComplete="given-name"
                            name="ra"
                            required
                            fullWidth
                            id="ra"
                            label="Registro Acadêmico"
                            autoFocus
                            value={ra}
                            onChange={(e) => {
                                setRa(e.target.value);
                                setRaError(!e.target.value);
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={courseError}
                            helperText={courseError ? 'Curso é obrigatório' : ''}
                            required
                            fullWidth
                            id="course"
                            label="Curso"
                            name="course"
                            autoComplete="family-name"
                            value={course}
                            onChange={(e) => {
                                setCourse(e.target.value);
                                setCourseError(!e.target.value);
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={emailError}
                            helperText={emailError ? emailErrorMessage : ''}
                            required
                            fullWidth
                            id="login_credential"
                            label="Email"
                            name="login_credential"
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
                            label="Senha"
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
            
            <Grid item xs={10} style={{ textAlign: "right", marginTop: "10px" }}>
                <Link href="/" variant="body2">
                    Already have an account? Sign in
                </Link>
            </Grid>
        </Grid>
    );
}

export default SignUp;
