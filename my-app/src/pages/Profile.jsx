import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from "../components/NavBar/index.jsx";

export function Profile() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [course, setCourse] = useState(""); // Estado para o campo de curso
  const userType = localStorage.getItem('userType');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailValue = data.get("email");
    const passwordValue = data.get("password");
    const courseValue = data.get("course");

    let valid = true;

    if (!emailValue) {
      setEmailError(true);
      setEmailErrorMessage("E-mail é obrigatório");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!passwordValue) {
      setPasswordError(true);
      setPasswordErrorMessage("Senha é obrigatória");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (valid) {
      console.log({
        email: emailValue,
        password: passwordValue,
        course: courseValue, // Inclui o curso no objeto
      });
    }
  };

  return (
    <>
      <Navbar />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 3,
              p: 3,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Editar Perfil
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={emailError}
                  helperText={emailError ? emailErrorMessage : ""}
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  helperText={passwordError ? passwordErrorMessage : ""}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="course"
                  label="Curso (Estudante)"
                  name="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#F6BA04",
                "&:hover": { backgroundColor: "#F6A204" },
              }}
            >
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
