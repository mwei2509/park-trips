import { injectGlobal } from 'react-emotion';
import theme from './styles/theme';

injectGlobal`
  * {
    box-sizing: border-box;
    font-weight: normal;
    transition: background 0.25s ease-out,
                background-color 0.25s ease-out,
                border-color 0.25s ease-out,
                box-shadow 0.25s ease-out,
                color 0.25s ease-out,
                transform 0.25s ease-out;
  }

  body {
    font-family: ${theme.primaryFont};
    font-size: ${theme.baseFontSize};
    background-color: ${theme.backgroundColor};
    margin: 0;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
      outline: none;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 24px 0;
  }

  h1 {
    font-family: 'SangBleu Kingdom Light';
    font-size: ${theme.fontSizes.x5large};
    line-height: 1.258389;
    letter-spacing: -1.25px;
  }

  h2 {
    font-family: 'SangBleu Kingdom Light';
    font-size: ${theme.fontSizes.x4large};
    line-height: 1.179555;
    letter-spacing: -1.00px;
  }

  h3 {
    font-family: 'Apercu Medium';
    font-size: ${theme.fontSizes.x3large};
    line-height: 0.982962;
    letter-spacing: -0.80px;
  }

  h4 {
    font-family: 'Apercu Medium';
    font-size: ${theme.fontSizes.x2large};
    line-height: 1.229005;
    letter-spacing: 0.64px;
  }

  h5 {
    font-family: 'Apercu Medium';
    font-size: ${theme.fontSizes.xlarge};
    line-height: 1.536097;
    letter-spacing: -0.41px;
  }

  h6 {
    font-family: 'Apercu Medium';
    font-size: ${theme.fontSizes.large};
    line-height: 0.959691;
    letter-spacing: -0.262px;
  }

  .no-margin {
    margin: 0;
  }

  ul {
    padding: 0;
  }

  .fade-in-enter {
    opacity: 0.01;
    transform: scale(1) translateY(20%);
  }
  .fade-in-enter-active {
    opacity: 1;
    transform: scale(1) translateY(0%);
    transition: all 300ms ease-out;
  }
  .fade-in-exit {
    opacity: 1;
    transform: scale(1) translateY(0%);
  }
  .fade-in-exit-active {
    opacity: 0.01;
    transform: scale(1) translateY(20%);
    transition: all 300ms ease-out;
}
`;
