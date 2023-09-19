import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import NetflixIntro from "./Pages/NetflixIntro";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/NetflixIntro" element={<NetflixIntro />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
