import React from "react";
import styled from "@emotion/styled";

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
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    ul li {
      display: inline-block;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Aplicacion de productividad</h1>
      <nav>
        <ul>
          <li>Nueva tarea</li>
          <li>Historial de tareas completadas</li>
          <li>Prellenar tareas</li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
