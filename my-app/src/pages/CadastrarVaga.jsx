//descrição
//nome da empresa
//título da vaga

import * as React from 'react';
import { useState } from 'react';

import axios from "axios";

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
import Navbar from "../components/NavBar/index.jsx";

import { grey } from '@mui/material/colors';

export const CadastrarVaga = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState(false);
    const [jobTitleErrorMessage, setJobTitleErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jobTitleValue = data.get('jobTitle');
        const passwordValue = data.get('password');

        let valid = true;

        if (!jobTitleValue) {
            setJobTitleError(true);
            setJobTitleErrorMessage('Titulo da vaga é obrigatório');
            valid = false;
        } 

        if (valid) {
            console.log({
                jobTitle: jobTitleValue,
                password: passwordValue,
            });
            // navigate('/home', { state: { type } }); // Redirecionar para /home
        }
    };

    return (
        <div style={{ background: grey[100] }}>
            <Grid container>
                <Navbar/>
            </Grid>
            <Grid container justifyContent="center" sx={{ padding: "30px" }}>
                
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Typography component="h1" variant="h4" style={{ textAlign: "center", padding: "10px", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                       Cadastrar Vaga
                    </Typography>
                </Grid>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={jobTitleError}
                                helperText={jobTitleError ? jobTitleErrorMessage : ''}
                                required
                                fullWidth
                                id="jobTitle"
                                label="Título da Vaga"
                                name="jobTitle"
                                style={{ width: "600px" }}
                                autoFocus
                                value={jobTitle}
                                onChange={(e) => {
                                    setJobTitle(e.target.value);
                                    setJobTitleError(false);
                                }}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <TextField
                                error={descriptionError}
                                helperText={descriptionError ? descriptionErrorMessage : ''}
                                required
                                fullWidth
                                name="description"
                                label="Descrição"
                                id="description"
                                value={descrição}
                            />
                        </Grid> */}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#F6BA04',
                                    '&:hover': {
                                        backgroundColor: '#F6A204', // cor ao passar o mouse
                                    }
                                }}
                            >
                                Cadastrar
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
        </div>
    );
};
