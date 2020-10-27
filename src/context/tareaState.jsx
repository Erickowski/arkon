import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

const TareaState = ({ children }) => {
  const initialState = {
    tareas: [],
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Funciones

  return (
    <TareaContext.Provider value={{ tareas: state.tareas }}>
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
