import { ACTUALIZAR_TAREA, CREAR_TAREA, OBTENER_TAREA } from "../types";

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
    default:
      return state;
  }
}
