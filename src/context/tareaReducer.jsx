import { CREAR_TAREA } from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREAR_TAREA:
      return {
        ...state,
        tareas: [...state.tareas, action.payload],
      };
    default:
      return state;
  }
};
