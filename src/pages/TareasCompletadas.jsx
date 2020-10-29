import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";

import TareaContext from "../context/tareaContext";

import Tareas from "../components/Tareas";
import Chart from "../components/Chart";

// Estilos del componente
const CompletedContainer = styled.main`
  min-height: 85vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TareasCompletadas = () => {
  // Extraemos la tarea del context
  const { tareas } = useContext(TareaContext);

  // State para guardar las tareas terminadas del context
  const [tareasTerminadas, guardarTareasTerminadas] = useState([]);

  // Al cargar el componente filtramo y asignamos las tareas filtradas al state
  useEffect(() => {
    guardarTareasTerminadas(
      tareas.filter((tarea) => tarea.estado === "Terminada")
    );
  }, [tareas]);

  return (
    <CompletedContainer>
      <h2>Tareas Completadas</h2>
      {tareas.length === 0 ? (
        <p>Aún no tienes tareas terminadas, termina una.</p>
      ) : (
        <>
          <Chart tareas={tareasTerminadas} />
          <Tareas tareas={tareasTerminadas} />
        </>
      )}
    </CompletedContainer>
  );
};

export default TareasCompletadas;
