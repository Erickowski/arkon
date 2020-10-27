import React from "react";
import { css, Global } from "@emotion/core";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --blue: #031d44;
            --white: #f1f1f1;
            --black: #020202;
            --font: "Roboto", sans-serif;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5;
            margin: 0;
            background-color: var(--white);
            font-family: var(--font);
          }
          h1,
          h2,
          h3 {
            margin: 0;
            padding: 0;
          }
          ul {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
