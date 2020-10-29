import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import TareaContext from "../context/tareaContext";

// Estilos del componente
const EditarTareaContainer = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    text-transform: uppercase;
    color: var(--black);
  }
  form {
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    div {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      input,
      select {
        width: 50%;
      }
    }
    & > p {
      padding: 1rem;
      border-radius: 1rem;
      background-color: red;
      color: var(--white);
      text-align: center;
    }
    > input {
      margin-top: 2rem;
      padding: 1rem;
      background-color: var(--blue);
      color: var(--white);
      font-weight: 700;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background-color: var(--white);
        color: var(--blue);
      }
    }
    .personalizada {
      justify-content: center;
      input {
        width: 30vw;
      }
    }
  }
`;

// Capturamos el id de la ruta
const EditarTarea = ({
  match: {
    params: { id },
  },
}) => {
  // Extraemos el valores y funciones a utilizar del context
  const { obtenerTarea, tareaeditada, actualizarTarea } = useContext(
    TareaContext
  );

  // Usamos el hook useHistory para la redireccion
  const history = useHistory();

  // Definimos el state del componente
  const [tarea, guardarTarea] = useState(tareaeditada);
  const [error, guardarError] = useState(false);

  // Obtenemos el id de la tarea y lo guardamos en el state
  useEffect(() => {
    obtenerTarea(id);
    guardarTarea(tareaeditada);
    // eslint-disable-next-line
  }, [id, tareaeditada]);

  // Extraemos los valores de la tarea
  const { nombre, duracion, tiempo } = tarea;

  // Mandejamos el cambio en el formulario para guardarlo en el state
  const onChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  // Manejamos el submit
  const onSubmit = (e) => {
    // Prevenimos la recarga
    e.preventDefault();
    // Validamos que los campos no esten vacios
    if (
      nombre.trim() === "" ||
      duracion === "" ||
      (duracion === "personalizada" && tiempo === "")
    ) {
      guardarError("Todos los campos son obligatorios.");
      return;
    }
    // Validamos que la duracion personalizada no sea menor a 1 ni mayor a 120
    if (duracion === "personalizada" && (tiempo < 1 || tiempo > 120)) {
      guardarError("El tiempo no puede ser menor a 0 o mayor de 120 minutos");
      return;
    }
    // Regresamos el error a su valor inicial
    guardarError(false);
    // Acttualizamos la tarea en la api y en el state
    actualizarTarea(tarea);
    // Mostramos una alerta
    Swal.fire("¡Tarea editada!", "La tarea fue editada con exito.", "success");
    // Redirigimos al home
    history.push("/");
  };

  return (
    <EditarTareaContainer>
      <h2>Editar Tarea</h2>
      <p>Todas las tareas editadas vuelven a estar "Sin empezar"</p>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la tarea"
            value={nombre}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="duracion">Duración</label>
          <select name="duracion" value={duracion} onChange={onChange}>
            <option value="">--Selecciona--</option>
            <option value="corta">30 minutos</option>
            <option value="media">45 minutos</option>
            <option value="larga">1 hora</option>
            <option value="personalizada">Personalizada</option>
          </select>
        </div>
        {duracion === "personalizada" && (
          <div className="personalizada">
            <input
              type="number"
              step="any"
              placeholder="Coloca la hora en minutos y segundos"
              name="tiempo"
              value={tiempo}
              onChange={onChange}
            />
          </div>
        )}
        <input className="submit" type="submit" value="Editar tarea" />
      </form>
    </EditarTareaContainer>
  );
};

export default EditarTarea;
