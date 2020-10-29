import {
  ACTUALIZAR_ESTADO,
  ACTUALIZAR_TAREA,
  CREAR_TAREA,
  ELIMINAR_TAREA,
  OBTENER_TAREA,
  PAUSAR_TAREA,
  REINICIAR_TAREA,
  COMPLETAR_TAREA,
  GENERAR_TAREAS,
  OBTENER_TAREAS,
} from "../types";

// eslint-disable-next-line
export default function (state, action) {
  switch (action.type) {
    // Action para crear la tarea a las ya existentes
    case CREAR_TAREA:
      return {
        ...state,
        tareas: [...state.tareas, action.payload],
      };
    // Action para obtener una tarea por su id
    case OBTENER_TAREA:
      return {
        ...state,
        tareaeditada: state.tareas.filter(
          (tarea) => tarea.id === action.payload
        )[0],
      };
    case ACTUALIZAR_TAREA:
      // Action para actualizar una tarea por su id y quitamos si hay una tarea a editar
      return {
        ...state,
        tareaeditada: {
          nombre: "",
          duracion: "",
          tiempo: "",
        },
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? (tarea = action.payload) : tarea
        ),
      };
    // Actions para actualizar la tarea pasando el objeto completo
    case ACTUALIZAR_ESTADO:
    case PAUSAR_TAREA:
    case REINICIAR_TAREA:
    case COMPLETAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? (tarea = action.payload) : tarea
        ),
      };
    // Action para eliminar tareas del state
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    // Action para generar tareas aleatorias u obtenerlas de la API
    case GENERAR_TAREAS:
    case OBTENER_TAREAS:
      return {
        ...state,
        tareas: action.payload,
      };
    default:
      return state;
  }
}
