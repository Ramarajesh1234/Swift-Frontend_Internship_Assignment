import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Dashboard} />
        <Route path="/profile" element={Profile} />
      </Routes>
    </Router>
  );
}
