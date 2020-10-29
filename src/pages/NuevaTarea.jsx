import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import TareaContext from "../context/tareaContext";

// Estilos del componente
const NuevaTareaContainer = styled.main`
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

const NuevaTarea = () => {
  // Extraemos la funcion para agregar tareas del context
  const { agregarTarea } = useContext(TareaContext);

  // Usamos el hook para redireccionar al usuario cuando agrega una tarea
  const history = useHistory();

  // state inicial de las tareas
  const [tarea, guardarTarea] = useState({
    nombre: "",
    duracion: "",
  });
  // Capturamos errores con este state
  const [error, guardarError] = useState(false);
  // capturamos la hora personalizada, me parece que pudo ser mejorado con una propiedad más 
  const [horaPersonalizada, guardarHoraPersonalizada] = useState("");

  // Capturamos los cambios 
  const onChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  // Extraemos los valores de la tarea
  const { nombre, duracion } = tarea;

  // Funcion para guardar la tarea
  const onSubmit = (e) => {
    // Prevenimos el comportamiento nativo
    e.preventDefault();
    // Validamos campos vacios
    if (
      nombre.trim() === "" ||
      duracion === "" ||
      (duracion === "personalizada" && horaPersonalizada.trim() === "")
    ) {
      guardarError("Todos los campos son obligatorios.");
      return;
    }
    // Validamos que la duracion personalizada sea mayor a 1 y menos a 120
    if (
      duracion === "personalizada" &&
      (horaPersonalizada < 1 || horaPersonalizada > 120)
    ) {
      guardarError(
        "El tiempo no puede ser menor a 0 o mayor de 120 minutos ni decimal"
      );
      return;
    }
    // Asignamos la duracion a la propiedad de la tarea
    if (duracion === "personalizada") {
      tarea.duracion = horaPersonalizada;
    }
    // Quitamos error cuando pasamos la validacion
    guardarError(false);
    // Agregamos la tarea al state y a la api
    agregarTarea(tarea);
    // Mandamos una alerta de que la tarea fue creada exitosamente
    Swal.fire("¡Tarea creada!", "La tarea fue creada con exito.", "success");
    // Redireccionamos al home
    history.push("/");
  };

  return (
    <NuevaTareaContainer>
      <h2>Nueva Tarea</h2>
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
              placeholder="Coloca la hora en minutos"
              value={horaPersonalizada}
              onChange={(e) => guardarHoraPersonalizada(e.target.value)}
            />
          </div>
        )}
        <input className="submit" type="submit" value="Crear tarea" />
      </form>
    </NuevaTareaContainer>
  );
};

export default NuevaTarea;
