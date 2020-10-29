import React from "react";
import styled from "@emotion/styled";

import Tarea from "./Tarea";

const TareasContainer = styled.table`
  width: 80vw;
  margin-top: 2rem;
  line-height: 2;
`;

const Tareas = ({ tareas }) => {
  return (
    <TareasContainer>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Duración</th>
          <th>Tiempo completado</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tareas.map((tarea) => (
          <Tarea key={tarea.id} tarea={tarea} />
        ))}
      </tbody>
    </TareasContainer>
  );
};

export default Tareas;
