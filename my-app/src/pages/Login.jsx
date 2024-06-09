import * as React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Student from '../components/Login/Student';

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

    return (
        <Container component="main" minWidht="xs">
            <Student/>
            <Copyright />
        </Container>
    );
}

export default Login;
