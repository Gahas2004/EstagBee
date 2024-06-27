import * as React from 'react';
import { useState } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Student from "../components/Signup/Student"; 
import Company from "../components/Signup/Company"; 


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
    const [selectedButton, setSelectedButton] = useState('student'); // Estado para controlar qual botão está selecionado
    
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const selectedColor = '#F6BA04';
    const unselectedColor = '#D3D3D3';
    return (
        <Grid container>
            <Grid item xs={12} style={{ textAlign: "right", padding: 20 }}>
                <ButtonGroup variant="contained">
                    <Button
                        onClick={() => handleButtonClick('student')}
                        style={{
                            backgroundColor: selectedButton === 'student' ? selectedColor : unselectedColor,
                            color: '#fff'
                        }}
                    >
                        Estudante
                    </Button>
                    <Button
                        onClick={() => handleButtonClick('company')}
                        style={{
                            backgroundColor: selectedButton === 'company' ? selectedColor : unselectedColor,
                            color: '#fff'
                        }}
                    >
                        Empresa
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                {selectedButton === 'student' && (
                    <Student
                        type={'student'}
                    />
                )}
                {selectedButton === 'company' && (
                    <Company
                        type={'company'}
                    />
                )}
            </Grid>
            <Grid item xs={12}>
                <Copyright />
            </Grid>
        </Grid>
    );
}

export default SignUp;
