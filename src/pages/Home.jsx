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
  .filtro-container,
  .orden-container {
    width: 50vw;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
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
  const { tareas, obtenerTareas } = useContext(TareaContext);

  const [tareasTotal, guardarTareasTotal] = useState([]);
  const [filtro, guardarFiltro] = useState("");
  const [orden, guardarOrden] = useState("");

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

  const handleOrden = () => {
    if (orden.trim() === "" || orden === "estado") {
      guardarTareasTotal([
        ...tareas.sort((a, b) => a.estado.charCodeAt() - b.estado.charCodeAt()),
      ]);
    }
    if (orden === "nombre") {
      guardarTareasTotal(
        tareas.sort((a, b) => a.nombre.charCodeAt() - b.nombre.charCodeAt())
      );
    }
    if (orden === "duracion") {
      guardarTareasTotal([...tareas.sort((a, b) => a.duracion - b.duracion)]);
    }
  };

  useEffect(() => {
    if (tareas.length === 0) {
      obtenerTareas();
    } else {
      guardarTareasTotal(tareas);
      handleOrden();
    }
  }, [tareas]);

  return (
    <HomeContainer>
      <h2>Mis tareas</h2>
      {tareas.length === 0 ? (
        <p>Aún no tienes tareas agregadas, agrega una.</p>
      ) : (
        <>
          <p>
            Da click en el estado de las tareas para empezarlas o completarlas.
          </p>
          <p>Pausar la tarea o reinicia el avance con los iconos.</p>
          <div className="orden-container">
            <label htmlFor="orden">Ordenar</label>
            <select
              value={orden}
              onChange={(e) => guardarOrden(e.target.value)}
            >
              <option value="">--Selecciona--</option>
              <option value="nombre">Nombre</option>
              <option value="duracion">Duración</option>
              <option value="tiempo">Tiempo completado</option>
              <option value="estado">Estado</option>
            </select>
            <button type="button" onClick={() => handleOrden()}>
              {orden.trim() === "" ? "Reiniciar orden" : "Ordenar"}
            </button>
          </div>
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
