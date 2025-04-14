import { useState } from "react";
import "./App.css";
import MostrarComponentes from "./components/mostrarComponentes";
import HomePage from "./homePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mostrarComponentes" element={<MostrarComponentes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
