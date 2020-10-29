import React, { useReducer } from "react";
import shortid from "shortid";
import Axios from "axios";

// Importamos el context y el reducer
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

// Importamos los types de las actions
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

// Importamos nuestro custom hook
import UseWeek from "../hooks/useWeek";

const TareaState = ({ children }) => {
  // State inicial
  const initialState = {
    tareas: [],
    tareaeditada: {
      nombre: "",
      duracion: "",
      tiempo: "",
    },
  };

  // Creamos el estado inicial y el dispatch para manejar el flujo de la aplicacion
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Funciones
  // Agregar tarea
  const agregarTarea = async (tarea) => {
    // Creamos las propiedades iniciales de la tarea
    tarea.id = shortid.generate();
    tarea.estado = "Sin empezar";
    tarea.inicio = false;
    tarea.acumulador = 0;
    // Dependiendo de la duración de la tarea será el tiempo establecido
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
      // Insertamos en la API
      await Axios.post("http://localhost:4000/tareas", tarea);
      // Actualizamos el state
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
      // Obtenemos todas las tareas de la API
      const tareas = await Axios.get("http://localhost:4000/tareas");
      // Actualizamos el state con las tareas obtenidas
      dispatch({
        type: OBTENER_TAREAS,
        payload: tareas.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener tarea por id del state
  const obtenerTarea = (id) => {
    dispatch({
      type: OBTENER_TAREA,
      payload: id,
    });
  };

  // Actualizar tarea
  const actualizarTarea = async (tarea) => {
    // Modificamos la tarea a su estado inicial de completado
    tarea.estado = "Sin empezar";
    tarea.inicio = false;
    // Dependiendo de la duracion seleccionada sera el tiempo de la tarea
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
      // Actualizamos en la api
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      // Actualizamos en el state
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
      // Eliminamos la tarea de la api
      await Axios.delete(`http://localhost:4000/tareas/${id}`);
      // Eliminamos la tarea del state
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
      // Actualizamos el estado de la tarea en la api
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      // Actualizamos el estado de la tarea en el state
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
    // Modificamos las propiedades de la tarea
    tarea.estado = "Pausada";
    tarea.inicio = null;
    try {
      // Actualizamos el estado de la tarea en la api
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      // Actualizamos el estado de la tarea en el state
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
    // Modificamos las propiedades de la tarea
    tarea.inicio = null;
    tarea.estado = "Sin empezar";
    tarea.acumulador = 0;
    try {
      // Actualizamos el estado de la tarea en la api
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      // Actualizamos el estado de la tarea en el state
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
    // Modificamos las propiedades de la tarea
    tarea.estado = "Terminada";
    // Convertimos los milisegundos en minutos
    tarea.acumulador = tarea.tiempo * 60000;
    try {
      // Actualizamos el estado de la tarea en la api
      await Axios.put(`http://localhost:4000/tareas/${tarea.id}`, tarea);
      // Actualizamos el estado de la tarea en el state
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
    // Obtenemos los dias de la semana actual
    const actualDays = UseWeek(Date.now());
    // Declaramos un array vacio
    let randomTareas = [];
    // Establecemos los dos posibles estados y tres duraciones de las tareas
    let estado = ["Sin empezar", "Terminada"];
    let duracion = ["corta", "media", "larga", "personalizada"];
    // Bucle for para generar 50 tareas
    for (let index = 0; index < 50; index++) {
      // Nombramos la tarea dependiendo de su indice
      let nombre = "Tarea " + (index + 1);
      // Generamos el estado y su duracion aleatoriamente
      let estadoTarea = Math.round(Math.random() * 1);
      let duracionTarea = Math.round(Math.random() * 3);
      // Declaramos el tiempo y con base en la duracion de la tarea sera el tiempo para concluirla
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
      try {
        // Creamos un objeto con los datos generados
        const tareaGenerada = {
          id: shortid.generate(),
          nombre,
          estado: estado[estadoTarea],
          duracion: duracion[duracionTarea],
          tiempo,
          acumulador: estadoTarea === 0 ? 0 : tiempo * 60000,
          inicio:
            estadoTarea === 0
              ? null
              : actualDays[Math.round(Math.random() * 6)],
        };
        // Llenamos el arreglo con cada tarea generada
        randomTareas.push(tareaGenerada);
        // Insertamos cada tarea en la API, esto genera un bug en la app por la cantidad de peticiones
        await Axios.post("http://localhost:4000/tareas", tareaGenerada);
        // Modificamos el state
        dispatch({
          type: GENERAR_TAREAS,
          payload: randomTareas,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <TareaContext.Provider
      // Exportamos las variables y funciones para que los componentes tengan acceso
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
