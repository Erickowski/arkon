import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";

import TareaContext from "../context/tareaContext";

import Tareas from "../components/Tareas";

const HomeContainer = styled.main`
  min-height: 85vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 1rem 0;
  }
  .error {
    background-color: red;
    padding: 0.5rem;
    color: var(--white);
    border-radius: 1rem;
  }
  .filtro-container {
    width: 50vw;
    display: flex;
    justify-content: space-between;
    button {
      cursor: pointer;
      background-color: var(--blue);
      border-radius: 1rem;
      padding: 0.5rem;
      color: var(--white);
      border: none;
    }
  }
`;

const Home = () => {
  const { tareas } = useContext(TareaContext);

  const [tareasTotal, guardarTareasTotal] = useState([]);
  const [filtro, guardarFiltro] = useState("");
  const [error, guardarError] = useState(false);

  const handleFiltro = () => {
    if (filtro.trim() === "") {
      guardarTareasTotal(
        tareas.sort((a, b) => a.estado.charCodeAt() - b.estado.charCodeAt())
      );
    }
    if (filtro === "corto") {
      guardarTareasTotal(tareas.filter((tarea) => tarea.tiempo <= 30));
    }
    if (filtro === "medio") {
      guardarTareasTotal(
        tareas.filter((tarea) => tarea.tiempo > 30 && tarea.tiempo <= 60)
      );
    }
    if (filtro === "largo") {
      guardarTareasTotal(tareas.filter((tarea) => tarea.tiempo > 60));
    }
  };

  useEffect(() => {
    guardarTareasTotal(
      tareas.sort((a, b) => a.estado.charCodeAt() - b.estado.charCodeAt())
    );
  }, [tareas]);

  return (
    <HomeContainer>
      <h2>Mis tareas</h2>
      {tareasTotal.length === 0 ? (
        <p>Aún no tienes tareas agregadas, agrega una.</p>
      ) : (
        <>
          <p>
            Da click en el estado de las tareas para empezarlas o completarlas.
          </p>
          <p>Pausar la tarea o reinicia el avance con los iconos.</p>
          {error && <p className="error">{error}</p>}
          <div className="filtro-container">
            <label htmlFor="filtrar">Filtrar por duración</label>
            <select
              value={filtro}
              onChange={(e) => guardarFiltro(e.target.value)}
            >
              <option value="">--Selecciona--</option>
              <option value="corto">30 min o menos</option>
              <option value="medio">de 30 min a 1 h</option>
              <option value="largo">más de 1 h</option>
            </select>
            <button type="button" onClick={() => handleFiltro()}>
              {filtro.trim() === "" ? "Reiniciar filtro" : "Filtrar"}
            </button>
          </div>
          <Tareas tareas={tareasTotal} />
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
