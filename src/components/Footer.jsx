import React from "react";
import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  background-color: var(--blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  font-family: var(--font);
  padding: 1rem;
  div p {
    margin: 0.5rem 0;
    a {
      color: var(--white);
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <p>
          Hecho con ❤️ por{" "}
          <a href="https://github.com/Erickowski" target="__blank">
            Erickowski
          </a>
        </p>
      </div>
      <div>
        <p>Todos los derechos reservados &copy; 2020.</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
