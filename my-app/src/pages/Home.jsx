import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/NavBar/index.jsx";
import ResultCard from "../components/ResultCard/index-people.jsx";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { grey } from '@mui/material/colors';

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  const calcPagination = (count, length) => {
    if (page === 1) {
      const totalPages = Math.ceil(count / length);
      setTotalPages(totalPages);
    }
  };

  const getCharacters = async (search) => {
    try {
      setLoading(true);
      if (!!search && search.length > 0) {
        const params = `?search=${search}${page === 1 ? "" : `&page=${page}`} `;
        const { data } = await axios.get(
          `https://swapi.dev/api/people/${params}`
        );
        setCharacters(data.results);
        calcPagination(data.count, data.results.length);
      } else {
        if (page === 1) {
          const { data } = await axios.get("https://swapi.dev/api/people/");
          setCharacters(data.results);
          calcPagination(data.count, data.results.length);
        } else {
          const { data } = await axios.get(
            `https://swapi.dev/api/people/?page=${page}`
          );
          setCharacters(data.results);
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
      getCharacters(value);
    }, 1000);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleGoToHomeWorld = (homeWorldUrl) => {
    const id = homeWorldUrl.split("/")[5];
    navigate(`/job/`);
  };

  const handleGoToStarships = (starship) => {
    const id = starship.split("/")[5];
    navigate(`/starships/${id}`);
  };

  useEffect(() => {
    getCharacters(search);
  }, [page]);

  return (
    // multiplos characters
    <div style={{ background: grey[100] }}>
      <Grid container xs={12}>
        <Navbar setSearch={handleSearch} search={search} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="title-lg" style={{ marginTop: "1rem", marginLeft: "40px", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
            Vagas vistas recentemente
          </Typography>
        </Grid>
        {characters.map((character, index) => (
          <ResultCard
            name={character.name}
            gender={character.gender}
            height={character.height}
            onClick={() => {
              setSelectedCharacter(character)
              window.open(`/job/${index+1}`, '_blank');
            }}
            loading={loading}
          />

        ))}
      </Grid>
      
      <Box
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          sx={{ width: "FitScreen" }}
          count={totalPages}
          page={page}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Box>
    </div>
  );
};
