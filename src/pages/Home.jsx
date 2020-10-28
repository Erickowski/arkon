import React, { useContext } from "react";
import styled from "@emotion/styled";

import TareaContext from "../context/tareaContext";

import Tareas from "../components/Tareas";

const HomeContainer = styled.main`
  min-height: 85vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const { tareas } = useContext(TareaContext);
  return (
    <HomeContainer>
      <h2>Mis tareas</h2>
      {tareas.length === 0 ? (
        <p>Aún no tienes tareas agregadas, agrega una.</p>
      ) : (
        <>
          <p>
            Da click en el estado de las tareas para empezarlas o completarlas.
          </p>
          <Tareas tareas={tareas} />
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
