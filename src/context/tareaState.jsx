import React, { useReducer } from "react";

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
