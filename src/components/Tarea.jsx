import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

import TareaContext from "../context/tareaContext";

// Estilos del componente
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
  // Importamos todos los actions que vamos a usar
  const {
    eliminarTarea,
    cambiarEstado,
    pausarTarea,
    reiniciarTarea,
    completarTarea,
  } = useContext(TareaContext);

  // Funcion para eliminar una tarea, se muestra una alerta para confirmar la acción
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

  // Función para manejar el cambio del estado de la tarea
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
        inicio: moment(Date.now()).format(),
        acumulador: tarea.acumulador + (Date.now() - tarea.inicio),
      });
    }
  };

  // Función para manejar la pausa de la tarea
  const handlePause = () => {
    pausarTarea({
      ...tarea,
      acumulador: tarea.acumulador + (Date.now() - tarea.inicio),
    });
  };

  // Helper para convertir milisegundos a horas, minutos y segundos
  const convertMs = (miliseconds) => {
    const hours = Math.floor(miliseconds / 3600000);
    const minutes = Math.floor((miliseconds % 3600000) / 60000);
    const seconds = Math.floor(((miliseconds % 360000) % 60000) / 1000);
    return { clock: `${hours}:${minutes}:${seconds}`, hours, minutes };
  };

  // Al cargar el componente si una tarea sobrepaso su duración se marca como completa. No es en tiempo real.
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
    // eslint-disable-next-line
  }, []);

  return (
    <TareaContainer estado={tarea.estado}>
      <th>{tarea.nombre}</th>
      <th>{tarea.tiempo} min.</th>
      <th>
        {/* Dependiendo del estado de la tarea es lo que se va a mostrar */}
        {/* Solo se muestra un texto si no esta iniciada */}
        {tarea.estado === "Sin empezar" && "No iniciada"}
        {/* Si está "En curso" la tarea, se muestra el tiempo que ha transcurrido desde que se inicio */}
        {tarea.estado === "En curso" &&
          moment(tarea.inicio).from(Date.now() + tarea.acumulador)}
        {/* Si está "Pausada" o "Terminada" se muestra el tiempo de avance o el tiempo e que concluyo */}
        {(tarea.estado === "Pausada" || tarea.estado === "Terminada") &&
          convertMs(tarea.acumulador).clock + " (h:m:s)"}
      </th>
      <th className="estado">
        <span onClick={() => handleState()}>{tarea.estado}</span>
        {/* Si la tarea esta en curso se muestra el icono para pausarla */}
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
