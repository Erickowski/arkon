import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const TareaContainer = styled.tr`
  th {
    span,
    button,
    a {
      padding: 0.5rem;
      border-radius: 1rem;
      cursor: pointer;
      color: var(--white);
    }
    span {
      background-color: gray;
    }
    &.acciones {
      & .editar,
      & .eliminar {
        border: none;
      }
      & .editar {
        font-size: 1.4rem;
        margin-right: 0.5rem;
        background-color: green;
        text-decoration: none;
        font-weight: 400;
      }
      & .eliminar {
        background-color: red;
      }
    }
  }
`;

const Tarea = ({ tarea }) => {
  return (
    <TareaContainer>
      <th>{tarea.nombre}</th>
      <th>{tarea.tiempo} min.</th>
      <th className="estado">
        <span>{tarea.estado}</span>
      </th>
      <th className="acciones">
        <Link to={`/editar-tarea/${tarea.id}`} className="editar">
          Editar
        </Link>
        <button type="button" className="eliminar">
          Eliminar
        </button>
      </th>
    </TareaContainer>
  );
};

export default Tarea;
