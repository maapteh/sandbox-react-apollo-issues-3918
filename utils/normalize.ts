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
`;

export const Normalize = createGlobalStyle`${normalize}`;
