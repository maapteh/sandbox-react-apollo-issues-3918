import { css, createGlobalStyle } from 'styled-components';

export const normalize = css`
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    padding: 20px;
    font: 16px 'Open Sans', sans-serif;
  }
  a, a:visited {
    color: #00ade6;
    text-decoration: none;
  }
  h1 {
    margin: 0 0 12px;
    padding: 0;
  }
  p {
    margin: 0 0 12px;
    padding: 0;
  }
`;

export const Normalize = createGlobalStyle`${normalize}`;
