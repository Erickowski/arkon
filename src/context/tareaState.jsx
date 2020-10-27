import React, { useReducer } from "react";
import shortid from "shortid";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import { CREAR_TAREA } from "../types";

const TareaState = ({ children }) => {
  const initialState = {
    tareas: [],
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Funciones
  // Agregar tarea
  const agregarTarea = (tarea) => {
    tarea.id = shortid.generate();
    tarea.estado = "Sin empezar";
    switch (tarea.duracion) {
      case "corta":
        tarea.duracion = 0.5;
        break;
      case "mediana":
        tarea.duracion = 0.75;
        break;
      case "larga":
        tarea.duracion = 1;
        break;

      default:
        break;
    }
    tarea.inicio = false;

    dispatch({
      type: CREAR_TAREA,
      payload: tarea,
    });
  };

  return (
    <TareaContext.Provider value={{ tareas: state.tareas, agregarTarea }}>
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
