import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/NavBar/index.jsx';
import { useNavigate } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const CreateResume = () => {
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
    const company = localStorage.getItem('user');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let valid = true;

        
        if (!description) {
            setDescriptionError(true);
            setDescriptionErrorMessage('Você precisa escrever algo no currículo');
            valid = false;
        }

        if (valid) {
            try {
                const response = await axios.post('http://localhost:8000/student/resume/create', {
                    //Pegar do localStorage o que está no company
                    student_id: localStorage.getItem('student_id'),
                    description: description,
                });
                
                localStorage.setItem('resume_id', response.data.resume_id);
                navigate('/home');
                // Redirecionar ou fazer outra ação após o cadastro
            } catch (error) {
                console.error('Erro ao criar currículo:', error);
                // Tratar erro de cadastro aqui, se necessário
            }
        }
    };

    return (
        <Grid container>
            <Grid container>
                <Navbar />
            </Grid>
            <Grid container justifyContent="center" sx={{ padding: "30px" }}>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                    <Typography component="h1" variant="h4" style={{ textAlign: "center", padding: "10px", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                        Cadastrar Currículo
                    </Typography>
                </Grid>

                <Box component="form" onSubmit={handleSubmit} noValidate>
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
