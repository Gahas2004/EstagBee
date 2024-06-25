import React, { useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from "../components/NavBar/index.jsx";
import { useLocation } from 'react-router-dom';

export const CadastrarVaga = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState(false);
    const [jobTitleErrorMessage, setJobTitleErrorMessage] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
    const [requirements, setRequirements] = useState('');
    const [requirementsError, setRequirementsError] = useState(false);
    const [requirementsErrorMessage, setRequirementsErrorMessage] = useState('');
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState(false);
    const [locationMessage, setLocationErrorMessage] = useState('');
    const [remuneration, setRemuneration] = useState('');
    const [remunerationDisplay, setRemunerationDisplay] = useState('');
    const [remunerationError, setRemunerationError] = useState(false);
    const [remunerationErrorMessage, setRemunerationErrorMessage] = useState('');

    const locationState = useLocation().state;
    const type = locationState?.type;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jobTitleValue = data.get('jobTitle');
        const descriptionValue = data.get('description');
        const requirementsValue = data.get('requirements');
        const locationValue = data.get('location');
        const remunerationValue = remuneration;

        let valid = true;

        if (!jobTitleValue) {
            setJobTitleError(true);
            setJobTitleErrorMessage('Título da vaga é obrigatório');
            valid = false;
        }
        if (!descriptionValue) {
            setDescriptionError(true);
            setDescriptionErrorMessage('Descrição da vaga é obrigatória');
            valid = false;
        }
        if (!requirementsValue) {
            setRequirementsError(true);
            setRequirementsErrorMessage('Requisitos da vaga são obrigatórios');
            valid = false;
        }
        if (!locationValue) {
            setLocationError(true);
            setLocationErrorMessage('Local da vaga é obrigatório');
            valid = false;
        }
        if (!remunerationValue) {
            setRemunerationError(true);
            setRemunerationErrorMessage('Remuneração da vaga é obrigatória');
            valid = false;
        }

        if (valid) {
            console.log({
                jobTitle: jobTitleValue,
                description: descriptionValue,
                requirements: requirementsValue,
                location: locationValue,
                remuneration: parseFloat(remunerationValue.replace(/[^0-9.-]+/g,"")) / 100,
            });
            // navigate('/home', { state: { type } }); // Redirecionar para /home
        }
    };

    const handleRemunerationChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setRemuneration(value);
        setRemunerationDisplay(formatCurrency(value));
        setRemunerationError(false);
    };

    const formatCurrency = (value) => {
        const number = Number(value);
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(number / 100);
    };

    return (
        <Grid container>
            <Grid container>
                <Navbar />
            </Grid>
            <Grid container justifyContent="center" sx={{ padding: "30px" }}>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Typography component="h1" variant="h4" style={{ textAlign: "center", padding: "10px", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                        Cadastrar Vaga
                    </Typography>
                </Grid>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid item xs={12}>
                        <TextField
                            error={jobTitleError}
                            helperText={jobTitleError ? jobTitleErrorMessage : ''}
                            required
                            fullWidth
                            id="jobTitle"
                            label="Título da Vaga"
                            name="jobTitle"
                            style={{ width: "600px", marginBottom: "10px" }}
                            autoFocus
                            value={jobTitle}
                            onChange={(e) => {
                                setJobTitle(e.target.value);
                                setJobTitleError(false);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={descriptionError}
                            helperText={descriptionError ? descriptionErrorMessage : ''}
                            required
                            fullWidth
                            id="description"
                            label="Descrição da vaga"
                            name="description"
                            style={{ width: "600px", marginBottom: "10px" }}
                            autoFocus
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setDescriptionError(false);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={requirementsError}
                            helperText={requirementsError ? requirementsErrorMessage : ''}
                            required
                            fullWidth
                            id="requirements"
                            label="Requisitos da vaga"
                            name="requirements"
                            style={{ width: "600px", marginBottom: "10px" }}
                            autoFocus
                            value={requirements}
                            onChange={(e) => {
                                setRequirements(e.target.value);
                                setRequirementsError(false);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={locationError}
                            helperText={locationError ? locationMessage : ''}
                            required
                            fullWidth
                            id="location"
                            label="Localidade da vaga"
                            name="location"
                            style={{ width: "600px", marginBottom: "10px" }}
                            autoFocus
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setLocationError(false);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={remunerationError}
                            helperText={remunerationError ? remunerationErrorMessage : ''}
                            required
                            fullWidth
                            id="remuneration"
                            label="Remuneração da vaga"
                            name="remuneration"
                            style={{ width: "600px", marginBottom: "10px" }}
                            autoFocus
                            value={remunerationDisplay}
                            onChange={handleRemunerationChange}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ textAlign: "right" }}>
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
                </Box>
            </Grid>
        </Grid>
    );
};
