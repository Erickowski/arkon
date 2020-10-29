import React, { useReducer } from "react";
import shortid from "shortid";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import Axios from "axios";

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
  OBTENER_TAREAS,
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
  const agregarTarea = async (tarea) => {
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

    try {
      await Axios.post("http://localhost:4000/tareas", tarea);
      dispatch({
        type: CREAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener tareas
  const obtenerTareas = async () => {
    try {
      const tareas = await Axios.get("http://localhost:4000/tareas");
      dispatch({
        type: OBTENER_TAREAS,
        payload: tareas.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener tarea por id
  const obtenerTarea = (id) => {
    dispatch({
      type: OBTENER_TAREA,
      payload: id,
    });
  };

  // Actualizar tarea
  const actualizarTarea = async (tarea) => {
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
    try {
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar tarea por id
  const eliminarTarea = async (id) => {
    try {
      await Axios.delete(`http://localhost:4000/tareas/${id}`);
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Cambiar estado de la tarea
  const cambiarEstado = async (tarea) => {
    try {
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      dispatch({
        type: ACTUALIZAR_ESTADO,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Pausar la tarea
  const pausarTarea = async (tarea) => {
    tarea.estado = "Pausada";
    tarea.inicio = null;
    try {
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      dispatch({
        type: PAUSAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Reiniciar la tarea
  const reiniciarTarea = async (tarea) => {
    tarea.inicio = null;
    tarea.estado = "Sin empezar";
    tarea.acumulador = 0;
    try {
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      dispatch({
        type: REINICIAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Tarea completada
  const completarTarea = async (tarea) => {
    tarea.estado = "Terminada";
    tarea.acumulador = tarea.tiempo * 60000;
    try {
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      dispatch({
        type: COMPLETAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Generar tareas aleatorias
  const generarTareas = async () => {
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
        default:
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
    try {
      await Axios.post("http://localhost:4000/tareas", randomTareas);
      dispatch({
        type: GENERAR_TAREAS,
        payload: randomTareas,
      });
    } catch (error) {
      console.log(error);
    }
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
        obtenerTareas,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
