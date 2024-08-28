import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LinkedInCertificate from "./Layout/Linkedin";
import Home from "./Layout/Home";
import CustomDesign from "./Layout/CustomDesign";
import UdemyCertificate from "./Layout/Udemy";
import Verify from "./Layout/Verify";
import Header from "./Layout/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/custom-design" element={<CustomDesign />} />
          <Route
            path="/certificate/linkedin"
            element={<LinkedInCertificate />}
          />
          <Route path="/certificate/udemy" element={<UdemyCertificate />} />
          <Route path="/verify/:id" element={<Verify />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
