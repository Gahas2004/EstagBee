import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/NavBar/index.jsx';
import { v4 as uuidv4 } from 'uuid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

export const CreateJob = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState(false);
    const [jobTitleErrorMessage, setJobTitleErrorMessage] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
    const userType = localStorage.getItem('userType');
    const company = localStorage.getItem('user');
    console.log(company);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;

        if (!jobTitle) {
            setJobTitleError(true);
            setJobTitleErrorMessage('Título da vaga é obrigatório');
            valid = false;
        }
        if (!description) {
            setDescriptionError(true);
            setDescriptionErrorMessage('Descrição da vaga é obrigatória');
            valid = false;
        }

        if (valid) {
            try {
                const response = await axios.post('http://localhost:8000/job_opening/create', {
                    //Pegar do localStorage o que está no company
                    company_id: localStorage.getItem('company_id'),
                    company_name: localStorage.getItem('company_name'),
                    job_name: jobTitle,
                    description: description,
                    job_id: null
                    // Adicione outros campos necessários para o cadastro da vaga
                });
                navigate('/home');
                console.log(response.data); // Aqui você pode lidar com a resposta do backend

                // Redirecionar ou fazer outra ação após o cadastro
            } catch (error) {
                console.error('Erro ao cadastrar vaga:', error);
                // Tratar erro de cadastro aqui, se necessário
            }
        }
    };

    return (
        console.log(uuidv4()),
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
                            id="job_name"
                            label="Título da Vaga"
                            name="job_name"
                            style={{ width: "650px", marginBottom: "10px" }}
                            autoFocus
                            value={jobTitle}
                            onChange={(e) => {
                                setJobTitle(e.target.value);
                                setJobTitleError(false);
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid item xs={12} style={{ width: "650px", marginBottom: "10px" }}>
                            <CKEditor
                                name="description"
                                id="description"
                                editor={ClassicEditor}
                                data={description}
                                onChange={(_, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                    setDescriptionError(false);
                                }}
                            />
                            {descriptionError && <span style={{ color: 'red' }}>{descriptionErrorMessage}</span>}
                        </Grid>
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
                            style={{ marginTop: "10px" }}
                        >
                            Cadastrar
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
