import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/NavBar/index.jsx";
import ResultCard from "../components/ResultCard/ResultCard.jsx";
import { Grid, Pagination, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { grey } from '@mui/material/colors';

export const Home = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);
  const userType = localStorage.getItem('userType');

  const calcPagination = (totalJobs) => {
    const totalPages = Math.ceil(totalJobs / 10); // Assumindo 10 vagas por página
    setTotalPages(totalPages);
  };

  const getJobOpenings = async (search, currentPage) => {
    try {
      setIsLoading(true);
      const params = `?page=${currentPage}&search=${search}`;
      const { data } = await axios.get(`http://localhost:8000/job_opening/get_all`);
      setJobOpenings(data || []); // Adicione uma verificação para jobOpenings
      calcPagination(data.totalJobs || 0); // Adicione uma verificação para totalJobs
      console.log(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      getJobOpenings(value, 1);
    }, 1000);
  };

  const handlePageChange = (page) => {
    setPage(page);
    getJobOpenings(search, page);
  };

  const handleViewDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  useEffect(() => {
    getJobOpenings(search, page);
  }, [page]);

  console.log(jobOpenings);
  return (
    <>
      {
        jobOpenings.length > 0 ?
          <div style={{ background: grey[100] }}>
            <Grid container>
              <Navbar setSearch={handleSearch} search={search} type={userType} />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="title-lg" style={{ marginTop: "1rem", marginLeft: "40px", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                  Vagas disponíveis
                </Typography>
              </Grid>
              {
                isLoading ? (
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  jobOpenings.map((job, index) => (
                    <ResultCard
                      key={index}
                      name={job.company_name}
                      subtitle={job.job_name}
                      description={job.description}
                      onClick={() => handleViewDetails(job.job_id)}
                    />
                  ))
                )
              }
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination count={totalPages} page={page} onChange={(e, value) => handlePageChange(value)} />
            </Grid>
          </div>
          :
          <div style={{ background: grey[100] }}>
            <Grid container>
              <Navbar setSearch={handleSearch} search={search} type={userType} />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="title-lg" style={{ marginTop: "1rem", marginLeft: "40px", fontSize: "2rem", fontFamily: "Poppins", fontWeight: "bold", color: "#F6BA04" }}>
                  Nenhuma vaga encontrada
                </Typography>
              </Grid>
            </Grid>
          </div>
      }
    </>
  );
};

export default Home;
