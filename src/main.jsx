// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Participantes from "./pages/Participantes";
import Resultado from "./pages/Resultado";
import ResultadoBloqueado from "./pages/ResultadoBloqueado";

import Layout from "./components/Layout";
import Premium from "./pages/Premium";
import Criar from "./pages/Criar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="premium" element={<Premium />} />
          <Route path="criar" element={<Criar />} />
          <Route path="/participantes/:idGrupo" element={<Participantes />} />
          <Route path="/resultado/:idGrupo/:uuid" element={<Resultado />} />
          <Route path="/resultado-bloqueado" element={<ResultadoBloqueado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
