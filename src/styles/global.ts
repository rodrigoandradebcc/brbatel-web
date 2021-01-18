import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    background: #f0f2f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Poppins', sans-serif;
    outline-style: none;
    border-color: transparent;
  }

  button{
      cursor: pointer;
  }
`;
