import React, { useContext, useEffect } from "react";
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
      background-color: ${(props) => props.estado === "Sin empezar" && "gray"};
      background-color: ${(props) => props.estado === "En curso" && "green"};
      background-color: ${(props) => props.estado === "Pausada" && "red"};
      background-color: ${(props) =>
        props.estado === "Terminada" && "var(--blue)"};
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
  const {
    eliminarTarea,
    cambiarEstado,
    pausarTarea,
    reiniciarTarea,
    completarTarea,
  } = useContext(TareaContext);

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
      cambiarEstado({
        ...tarea,
        estado: "Terminada",
        inicio: null,
        acumulador: tarea.acumulador + (Date.now() - tarea.inicio),
      });
    }
  };

  const handlePause = () => {
    pausarTarea({
      ...tarea,
      acumulador: tarea.acumulador + (Date.now() - tarea.inicio),
    });
  };

  const convertMs = (miliseconds) => {
    const hours = Math.floor(miliseconds / 3600000);
    const minutes = Math.floor((miliseconds % 3600000) / 60000);
    const seconds = Math.floor(((miliseconds % 360000) % 60000) / 1000);
    return { clock: `${hours}:${minutes}:${seconds}`, hours, minutes };
  };

  useEffect(() => {
    if (tarea.estado === "En curso") {
      const horaactual = new Date();
      const horainicial = new Date(tarea.inicio);
      const tiempotranscurrido =
        (horaactual - horainicial + tarea.acumulador) / 1000;
      if (tiempotranscurrido >= tarea.tiempo * 60) {
        completarTarea(tarea);
      }
    }
  }, []);

  return (
    <TareaContainer estado={tarea.estado}>
      <th>{tarea.nombre}</th>
      <th>{tarea.tiempo} min.</th>
      <th>
        {tarea.estado === "Sin empezar" && "No iniciada"}
        {tarea.estado === "En curso" &&
          moment(tarea.inicio).from(Date.now() + tarea.acumulador)}
        {(tarea.estado === "Pausada" || tarea.estado === "Terminada") &&
          convertMs(tarea.acumulador).clock + " (h:m:s)"}
      </th>
      <th className="estado">
        <span onClick={() => handleState()}>{tarea.estado}</span>
        {tarea.estado === "En curso" && (
          <>
            {tarea.inicio && (
              <i className="far fa-pause-circle" onClick={handlePause}></i>
            )}
            <i
              className="fas fa-redo"
              onClick={() => reiniciarTarea(tarea)}
            ></i>
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
