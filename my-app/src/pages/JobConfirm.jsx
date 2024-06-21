import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar/index.jsx";
import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import Modal from "../components/Modal/Func.jsx";
import { styled } from "@mui/system";

const Input = styled("input")({
    display: "none",
});

export function JobConfirm() {
    const { id } = useParams();
    const [planet, setPlanet] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const debounceTimeout = useRef(null);

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

    const getPlanets = async (search) => {
        try {
            setLoading(true);
            if (!!search && search.length > 0) {
                const params = `?search=${search}${page === 1 ? "" : `&page=${page}`} `;
                const { data } = await axios.get(
                    `https://swapi.dev/api/planets${params}`
                );
                setPlanets(data.results);
                calcPagination(data.count, data.results.length);
            } else {
                if (page === 1) {
                    const { data } = await axios.get("https://swapi.dev/api/planets");
                    setPlanets(data.results);
                    calcPagination(data.count, data.results.length);
                } else {
                    const { data } = await axios.get(
                        `https://swapi.dev/api/planets/?page=${page}`
                    );

                    setPlanets(data.results);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            getPlanets(value);
        }, 1000);
    };

    useEffect(() => {
        const getPlanet = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `https://swapi.dev/api/planets/${id}/`
                );

                setPlanet(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) getPlanet();
    }, [id]);

    useEffect(() => {
        if (!id) getPlanets(search);
    }, [page]);

    if (!!planet)
        return (
            <>
                {/* single planet  */}
                <Navbar setSearch={handleSearch} search={search} />
                <Grid container xs={12} padding={4}>

                    <Grid item xs={12}>
                        <Typography variant="title-lg" style={{ marginTop: "1rem", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                            {planet.name}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', }}>
                        <Typography variant="h6" color="text.secondary">Descrição da vaga:</Typography>
                        <Typography variant="body1" color="text.secondary" style={{ marginLeft: '20px' }}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', }}>
                        <Typography variant="h6" color="text.secondary">Requisitos:</Typography>
                        <Typography variant="body1" color="text.secondary" style={{ marginLeft: '20px' }}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, às vezes por acidente, às vezes de propósito (injetando humor e afins).
                            É um fato estabelecido há muito tempo que um leitor se distrairá com o conteúdo legível de uma página ao olhar para seu layout. O objetivo de usar o Lorem Ipsum é que ele tem uma distribuição mais ou menos normal das letras, ao contrário
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', }}>
                        <Typography variant="h6" color="text.secondary">Localidade:</Typography>
                        <Typography variant="body1" color="text.secondary" style={{ marginLeft: '20px' }}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, e uma pesquisa por 'lorem ipsum' descobrirá muitos sites ainda em sua infância. Várias versões evoluíram ao longo dos anos, às vezes por acidente, às vezes de propósito (injetando humor e afins).
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', }}>
                        <Typography variant="h6" color="text.secondary">Remuneração:</Typography>
                        <Typography variant="body1" color="text.secondary" style={{ marginLeft: '20px' }}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, e uma pesquisa por 'lorem ipsum' descobrirá muitos sites ainda em sua infância. Várias versões evoluíram ao longo dos anos, às vezes por acidente, às vezes de propósito (injetando humor e afins).
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', padding: '10px 30px' }}>
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
                                setPlanet(null);
                            }}
                        >
                            Voltar
                        </Button>

                        <Modal
                            titulo={'Enviar currículo'}
                            content={
                                (props) => <EnviarDocumentos handleClose={() => { props.handleClose() }} {...props} />
                            }
                        />
                    </Grid>
                </Grid>
            </>
        );
}

const EnviarDocumentos = (props) => {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); // Adicionando estado para mensagem de sucesso

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            console.log("File submitted:", file);
            setSuccessMessage("Arquivo enviado com sucesso!"); // Define a mensagem de sucesso
            setFile(null); // Limpa o arquivo selecionado
            await sleep(2000); // Aguarda 2 segundos antes de fechar o modal
            props.handleClose(); // Fecha o modal
        } else {
            alert("Por favor, selecione um arquivo.");
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
                        Envie seu currículo e outros documentos necessários para se candidatar à vaga.
                    </Typography>
                </Grid>
                {file && (
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Arquivo selecionado: <strong>{file.name}</strong>
                        </Typography>
                    </Grid>
                )}
                {successMessage && ( // Exibe a mensagem de sucesso se ela estiver definida
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ color: "green" }}>
                            {successMessage}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', padding: '10px 30px' }}>
                    <label htmlFor="upload-file">
                        <Input
                            id="upload-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <Button variant="outlined" component="span" sx={{
                            color: '#F6BA04',
                            '&:hover': {
                                color: '#e6a503',
                                borderColor: '#F6BA04',
                            },
                            borderColor: '#F6BA04',
                        }}>
                            Selecionar Arquivo
                        </Button>
                    </label>
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
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JobConfirm;
