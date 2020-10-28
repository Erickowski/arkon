import React from "react";
import styled from "@emotion/styled";

const TareaContainer = styled.tr`
  th {
    span,
    button {
      padding: 0.5rem;
      border-radius: 1rem;
      cursor: pointer;
      color: var(--white);
    }
    span {
      background-color: gray;
    }
    button {
      border: none;
      margin-right: 0.5rem;
      &:last-of-type {
        margin-right: 0;
      }
      &.editar {
        background-color: green;
      }
      &.eliminar {
        background-color: red;
      }
    }
  }
`;

const Tarea = ({ tarea }) => {
  return (
    <TareaContainer>
      <th>{tarea.nombre}</th>
      <th>{tarea.duracion} min.</th>
      <th className="estado">
        <span>{tarea.estado}</span>
      </th>
      <th className="acciones">
        <button type="button" className="editar">
          Editar
        </button>
        <button type="button" className="eliminar">
          Eliminar
        </button>
      </th>
    </TareaContainer>
  );
};

export default Tarea;
