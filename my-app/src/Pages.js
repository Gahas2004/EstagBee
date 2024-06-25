import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Starships } from "./pages/Starships";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobConfirm } from "./pages/JobConfirm";
import { CadastrarVaga } from "./pages/CadastrarVaga";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastrar-vaga" element={<CadastrarVaga />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<Starships />} />
        <Route path="/job/:id" element={<JobConfirm/>} />
        <Route
          path="*"
          element={
            <div
              style={{
                backgroundColor: "#1c1e33",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <h1 style={{ textAlign: "center" }}>404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default Pages;
