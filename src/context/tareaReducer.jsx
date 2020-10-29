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
} from "../types";

// eslint-disable-next-line
export default function (state, action) {
  switch (action.type) {
    case CREAR_TAREA:
      return {
        ...state,
        tareas: [...state.tareas, action.payload],
      };
    case OBTENER_TAREA:
      return {
        ...state,
        tareaeditada: state.tareas.filter(
          (tarea) => tarea.id === action.payload
        )[0],
      };
    case ACTUALIZAR_TAREA:
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
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    case GENERAR_TAREAS:
      return {
        ...state,
        tareas: action.payload,
      };
    default:
      return state;
  }
}
