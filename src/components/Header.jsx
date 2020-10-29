import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import TareaContext from "../context/tareaContext";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 1rem;
  background-color: var(--blue);
  color: var(--white);
  ul {
    list-style: none;
  }
  ul li a,
  h1 a {
    text-decoration: none;
    color: var(--white);
  }
  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    ul li {
      display: inline-block;
      margin-right: 1.5rem;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .generate {
    cursor: pointer;
  }
`;

const Header = () => {
  const { generarTareas } = useContext(TareaContext);
  return (
    <HeaderContainer>
      <h1>
        <Link to="/">Aplicación de productividad</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Mis tareas</Link>
          </li>
          <li>
            <Link to="/nueva-tarea">Nueva tarea</Link>
          </li>
          <li>
            <Link to="/tareas-completadas">
              Historial de tareas completadas
            </Link>
          </li>
          <li className="generate" onClick={() => generarTareas()}>
            Prellenar tareas
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
