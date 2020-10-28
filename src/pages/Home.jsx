import React, { useContext } from "react";
import styled from "@emotion/styled";

import TareaContext from "../context/tareaContext";

import Tareas from "../components/Tareas";

const HomeContainer = styled.main`
  min-height: 85vh;
  padding: 1rem;
`;

const Home = () => {
  const { tareas } = useContext(TareaContext);
  console.log(tareas);
  return (
    <HomeContainer>
      <h2>Mis tareas</h2>
      {tareas.length === 0 ? (
        <p>Aún no tienes tareas agregadas, agrega una.</p>
      ) : (
        <Tareas />
      )}
    </HomeContainer>
  );
};

export default Home;
