import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100vw;
  margin: 0;
  padding: 1rem;
  background-color: var(--blue);
  color: var(--white);
  ul {
    list-style: none;
  }
  ul li a {
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
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Aplicacion de productividad</h1>
      <nav>
        <ul>
          <li>
            <Link>Nueva tarea</Link>
          </li>
          <li>Historial de tareas completadas</li>
          <li>Prellenar tareas</li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
