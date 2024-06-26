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

export function Login({ type }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
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

        if (!validateEmail(email)) {
            setEmailError(true);
            setEmailErrorMessage('Email inválido');
            return;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!validatePassword(password)) {
            setPasswordError(true);
            setPasswordErrorMessage('A senha deve ter pelo menos 6 caracteres e incluir uma letra maiúscula');
            return;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        try {
            const response = await axios.post('http://localhost:8000/user/student/login', {
                login_credential: email,
                password: password,
            });
            localStorage.setItem('student_id', response.data.id);
            localStorage.setItem('student_name', response.data.name);
            localStorage.setItem('userType', type);
            navigate('/home', { state: { type } });
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginErrorMessage('Usuário/senha inválidos');
        }
    };

    return (
        <Grid container justifyContent="center" sx={{ padding: '30px' }}>
            <Grid item style={{ textAlign: 'center', padding: '20px' }}>
                <img src={Logo} alt="Logo" />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                <Typography component="h1" variant="h5" style={{ textAlign: 'center', padding: '10px', fontFamily: 'Poppins', fontWeight: 'bold' }}>
                    Bem-vindo(a) ao Estagbee
                </Typography>
            </Grid>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
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
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) {
                                    setEmailError(!validateEmail(e.target.value));
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
                                    setPasswordErrorMessage('A senha deve ter pelo menos 6 caracteres e incluir uma letra maiúscula');
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
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembrar Login" />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#F6BA04',
                                '&:hover': {
                                    backgroundColor: '#F6A204',
                                },
                            }}
                        >
                            Entrar
                        </Button>
                    </Grid>

                    {loginErrorMessage && (
                        <Grid item xs={12}>
                            <Typography color="error" align="center">
                                {loginErrorMessage}
                            </Typography>
                        </Grid>
                    )}
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item xs={6}>
                        <Link href="#" variant="body2">
                            Esqueceu a senha?
                        </Link>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                        <Link href="/signup" variant="body2">
                            {"Não tem uma conta? Cadastre-se"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Login;
