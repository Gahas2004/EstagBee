import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar/index.jsx";
import axios from "axios";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Modal from "../components/Modal/Func.jsx";
import { styled } from "@mui/system";

const Input = styled("input")({
    display: "none",
});

export function JobConfirm() {
    const { id } = useParams();
    const [job, setJob] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const debounceTimeout = useRef(null);
    const userType = localStorage.getItem('userType');
    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleGoToHomeWorld = (homeWorldUrl) => {
        const id = homeWorldUrl.split("/")[5];
        navigate(`/planets/${id}`);
    };

    const calcPagination = (count, length) => {
        if (page === 1) {
            const totalPages = Math.ceil(count / length);
            setTotalPages(totalPages);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

    };
    const jobId = useParams();
    const job_id = jobId.id;
    const getJob = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8000/job_opening/get_one?job_id=${job_id}`);
            setJob(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getJob();
    }, []);
    console.log(job);
    return (
        <>
            {/* single planet  */}
            <Navbar setSearch={handleSearch} search={search} />
            <Grid container padding={4}>

                <Grid item xs={12}>
                    <Typography variant="title-lg" style={{ marginTop: "1rem", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                        {job.job_name}
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', }}>
                    <Typography variant="h6" color="text.secondary">Descrição da vaga:</Typography>
                    <Typography variant="body1" color="text.secondary" style={{ marginLeft: '20px' }}>
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />
                    </Typography>
                </Grid>


                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', padding: '10px 30px' }}>

                    {
                        userType === 'student' && (
                            <>

                                <Button variant="outlined" sx={{
                                    color: '#F6BA04',
                                    '&:hover': {
                                        color: '#e6a503', // cor personalizada para o hover
                                        borderColor: '#F6BA04',
                                    },
                                    borderColor: '#F6BA04',
                                }}
                                    onClick={() => {
                                        navigate('/home');
                                        // setPlanet(null);
                                    }}
                                >
                                    Voltar
                                </Button>
                                <Modal
                                    titulo={'Enviar currículo'}
                                    content={
                                        (props) => <EnviarDocumentos job_id={job_id} handleClose={() => { props.handleClose() }} {...props} />
                                    }
                                />
                            </>
                        )
                    }
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        userType === 'company' && (
                            <VerCandidatos job_id={job_id} />
                        )
                    }
                </Grid>
            </Grid>
        </>
    );
}

const EnviarDocumentos = (props) => {
    const [successMessage, setSuccessMessage] = useState(""); // Adicionando estado para mensagem de sucesso
    const [errorMessage, setErrormessage] = useState(""); // Adicionando estado para mensagem de sucesso

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Faz a chamada para o endpoint apply
            const response = await axios.post(`http://localhost:8000/job_opening/apply`, {
                job_id: props.job_id,
                resume_id: localStorage.getItem('resume_id'),
                description: null,
                name: null
            });

            console.log('Resposta do servidor:', response.data);
            setSuccessMessage("Candidatura efetuada com sucesso!");
            await sleep(2000);
            props.handleClose();
        } catch (error) {
            console.error('Erro interno do servidor:', error);
            setErrormessage("Você não possui um currículo cadastrado, por favor, cadastre um currículo para se candidatar a uma vaga.");
        }

    };


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ marginTop: "1rem", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                        Envio do currículo
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Envie seu currículo cadastrado em nosso sistema para a vaga desejada.
                    </Typography>
                </Grid>

                {successMessage && ( // Exibe a mensagem de sucesso se ela estiver definida
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ color: "green" }}>
                            {successMessage}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', padding: '10px 30px' }}>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#F6BA04',
                            '&:hover': {
                                backgroundColor: '#e6a503',
                            }
                        }}
                    >
                        Enviar currículo
                    </Button>
                </Grid>
                {
                    errorMessage && ( // Exibe a mensagem de erro se ela estiver definida
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{ color: "red" }}>
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    );
};

const VerCandidatos = (props) => {

    const [job, setJob] = useState([]); // Adicionando estado para mensagem de sucesso
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getJobApplicants = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8000/job_opening/retrieve?job_id=${props.job_id}`);
            setJob(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async () => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`http://localhost:8000/job_opening/delete?job_id=${props.job_id}`);
            setJob(data);
            navigate('/home');
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobApplicants();
    }, []);

    return (

        <Grid container spacing={2}>

            {/* gerar botão de cancelar a vaga */}
            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', }}>
                <Button variant="outlined" sx={{
                    color: '#F6BA04',
                    '&:hover': {
                        color: '#e6a503',
                        borderColor: '#F6BA04',
                    },
                    borderColor: '#F6BA04',
                }}
                    onClick={() => {
                        deleteJob();
                    }}
                >
                    Cancelar vaga
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" style={{ marginTop: "1rem", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                    {job.length == 0 ? 'Não há aplicações' : 'Lista de candidatos para esta vaga.'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {/* map para os candidatos */}
                {job.map((applicant, index) => (
                    <Grid item xs={12} key={index}>
                        <Typography variant="h6" style={{ marginTop: "1rem", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "grey" }}>
                            {applicant.name}
                        </Typography>
                        <Divider />
                        <Typography variant="body1" style={{ marginTop: "1rem", fontSize: "1rem" }}>
                            <div dangerouslySetInnerHTML={{ __html: applicant.description }} />
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default JobConfirm;
