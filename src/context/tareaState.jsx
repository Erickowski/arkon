import React, { useReducer } from "react";
import shortid from "shortid";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import { ACTUALIZAR_TAREA, CREAR_TAREA, OBTENER_TAREA } from "../types";

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

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareaeditada: state.tareaeditada,
        agregarTarea,
        obtenerTarea,
        actualizarTarea,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
