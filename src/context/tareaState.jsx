import React, { useReducer } from "react";
import shortid from "shortid";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  ACTUALIZAR_TAREA,
  CREAR_TAREA,
  ELIMINAR_TAREA,
  OBTENER_TAREA,
  ACTUALIZAR_ESTADO,
  PAUSAR_TAREA,
} from "../types";

const TareaState = ({ children }) => {
  const initialState = {
    tareas: [],
    tareaeditada: {
      nombre: "",
      duracion: "",
      tiempo: "",
    },
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Funciones
  // Agregar tarea
  const agregarTarea = (tarea) => {
    tarea.id = shortid.generate();
    tarea.estado = "Sin empezar";
    tarea.inicio = false;
    tarea.acumulador = 0;
    switch (tarea.duracion) {
      case "corta":
        tarea.tiempo = 30;
        break;
      case "media":
        tarea.tiempo = 45;
        break;
      case "larga":
        tarea.tiempo = 60;
        break;

      default:
        tarea.tiempo = tarea.duracion;
        tarea.duracion = "personalizada";
        break;
    }

    dispatch({
      type: CREAR_TAREA,
      payload: tarea,
    });
  };

  // Obtener tarea por id
  const obtenerTarea = (id) => {
    dispatch({
      type: OBTENER_TAREA,
      payload: id,
    });
  };

  // Actualizar tarea
  const actualizarTarea = (tarea) => {
    tarea.estado = "Sin empezar";
    tarea.inicio = false;
    switch (tarea.duracion) {
      case "corta":
        tarea.tiempo = 30;
        break;
      case "media":
        tarea.tiempo = 45;
        break;
      case "larga":
        tarea.tiempo = 60;
        break;

      default:
        tarea.tiempo = tarea.duracion;
        tarea.duracion = "personalizada";
        break;
    }
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    });
  };

  // Eliminar tarea por id
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  // Cambiar estado de la tarea
  const cambiarEstado = (tarea) => {
    dispatch({
      type: ACTUALIZAR_ESTADO,
      payload: tarea,
    });
  };

  // Pausar la tarea
  const pausarTarea = (tarea) => {
    tarea.estado = "Pausada";
    dispatch({
      type: PAUSAR_TAREA,
      payload: tarea,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareaeditada: state.tareaeditada,
        agregarTarea,
        obtenerTarea,
        actualizarTarea,
        eliminarTarea,
        cambiarEstado,
        pausarTarea,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
