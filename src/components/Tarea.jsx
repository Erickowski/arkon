import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

import TareaContext from "../context/tareaContext";

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
    &.estado {
      span,
      i {
        margin-right: 1rem;
        cursor: pointer;
      }
      i:last-of-type {
        margin-right: 0;
      }
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
  const { eliminarTarea, cambiarEstado, pausarTarea } = useContext(
    TareaContext
  );

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Una tarea eliminada no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminalo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTarea(tarea.id);
        Swal.fire(
          "¡Tarea eliminada!",
          "Tu tarea ha sido eliminada.",
          "success"
        );
      }
    });
  };

  const handleState = () => {
    if (tarea.estado === "Sin empezar" || tarea.estado === "Pausada") {
      cambiarEstado({
        ...tarea,
        estado: "En curso",
        inicio: new Date(),
      });
    }
    if (tarea.estado === "En curso") {
      cambiarEstado({ ...tarea, estado: "Terminada" });
    }
  };

  const handlePause = () => {
    pausarTarea({
      ...tarea,
      acumulador: (Date.now() - tarea.inicio) / 1000,
      inicio: false,
    });
  };

  return (
    <TareaContainer>
      <th>{tarea.nombre}</th>
      <th>{tarea.tiempo} min.</th>
      <th>
        {tarea.estado === "Sin empezar" && "No iniciada"}
        {tarea.estado === "En curso" &&
          moment(tarea.inicio).from(Date.now() + tarea.acumulador)}
        {tarea.estado === "Pausada" &&
          tarea.acumulador.toFixed(0) + " segundos"}
      </th>
      <th className="estado">
        <span onClick={() => handleState()}>{tarea.estado}</span>
        {tarea.estado === "En curso" && (
          <>
            {tarea.inicio && (
              <i className="far fa-pause-circle" onClick={handlePause}></i>
            )}
            <i className="fas fa-redo"></i>
          </>
        )}
      </th>
      <th className="acciones">
        <Link to={`/editar-tarea/${tarea.id}`} className="editar">
          Editar
        </Link>
        <button
          type="button"
          onClick={() => handleDelete()}
          className="eliminar"
        >
          Eliminar
        </button>
      </th>
    </TareaContainer>
  );
};

export default Tarea;
