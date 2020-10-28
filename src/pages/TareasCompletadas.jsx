import React, { useContext } from "react";
import styled from "@emotion/styled";

import TareaContext from "../context/tareaContext";

import Tareas from "../components/Tareas";

const CompletedContainer = styled.main`
  min-height: 85vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TareasCompletadas = () => {
  const { tareas } = useContext(TareaContext);
  return (
    <CompletedContainer>
      <h2>Tareas Completadas</h2>
      {tareas.filter((tarea) => tarea.estado === "Terminada").length === 0 ? (
        <p>Aún no tienes tareas terminadas, termina una.</p>
      ) : (
        <>
          <Tareas
            tareas={tareas.filter((tarea) => tarea.estado === "Terminada")}
          />
        </>
      )}
    </CompletedContainer>
  );
};

export default TareasCompletadas;
