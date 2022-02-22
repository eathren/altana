import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import HomePage from "./pages/Home";
import CompanyPage from "./pages/Company";

// custom components
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:id" element={<CompanyPage />} />\
        </Routes>
      </Router>
    </>
  );
}

export default App;
