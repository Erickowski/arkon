import React, { useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

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
  }
`;

const NuevaTarea = () => {
  const history = useHistory();

  const [tarea, guardarTarea] = useState({
    nombre: "",
    duracion: "",
  });
  const [error, guardarError] = useState(false);

  const onChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, duracion } = tarea;

  const onSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || duracion === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    history.push("/");
  };

  return (
    <NuevaTareaContainer>
      <h2>Nueva Tarea</h2>
      <form onSubmit={onSubmit}>
        {error && <p>Todos los campos son obligatorios.</p>}
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
          </select>
        </div>
        <input className="submit" type="submit" value="Crear tarea" />
      </form>
    </NuevaTareaContainer>
  );
};

export default NuevaTarea;
