import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { JobConfirm } from "./pages/JobConfirm";
import { CreateJob } from "./pages/CreateJob";
import { CreateResume } from "./pages/CreateResume";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:id" element={<JobConfirm/>} />
        <Route path="/create-resume" element={<CreateResume/>} />
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
