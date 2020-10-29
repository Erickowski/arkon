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
  REINICIAR_TAREA,
  COMPLETAR_TAREA,
  GENERAR_TAREAS,
} from "../types";

import UseWeek from "../hooks/useWeek";

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
        tarea.tiempo = Math.round(tarea.duracion);
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
    tarea.inicio = null;
    dispatch({
      type: PAUSAR_TAREA,
      payload: tarea,
    });
  };

  // Reiniciar la tarea
  const reiniciarTarea = (tarea) => {
    tarea.inicio = null;
    tarea.estado = "Sin empezar";
    tarea.acumulador = 0;
    dispatch({
      type: REINICIAR_TAREA,
      payload: tarea,
    });
  };

  // Tarea completada
  const completarTarea = (tarea) => {
    tarea.estado = "Terminada";
    tarea.acumulador = tarea.tiempo * 60000;
    dispatch({
      type: COMPLETAR_TAREA,
      payload: tarea,
    });
  };

  // Generar tareas aleatorias
  const generarTareas = () => {
    const actualDays = UseWeek(Date.now());
    let randomTareas = [];
    let estado = ["Sin empezar", "Terminada"];
    let duracion = ["corta", "media", "larga", "personalizada"];

    for (let index = 0; index < 50; index++) {
      let nombre = "Tarea " + (index + 1);
      let estadoTarea = Math.round(Math.random() * 1);
      let duracionTarea = Math.round(Math.random() * 3);
      let tiempo;
      switch (duracionTarea) {
        case 0:
          tiempo = 30;
          break;
        case 1:
          tiempo = 45;
          break;
        case 2:
          tiempo = 60;
          break;
        case 3:
          tiempo = Math.round(Math.random() * 121);
          break;
      }
      randomTareas.push({
        id: shortid.generate(),
        nombre,
        estado: estado[estadoTarea],
        duracion: duracion[duracionTarea],
        tiempo,
        acumulador: estadoTarea === 0 ? 0 : tiempo * 60000,
        inicio:
          estadoTarea === 0 ? null : actualDays[Math.round(Math.random() * 6)],
      });
    }
    dispatch({
      type: GENERAR_TAREAS,
      payload: randomTareas,
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
        reiniciarTarea,
        completarTarea,
        generarTareas,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
