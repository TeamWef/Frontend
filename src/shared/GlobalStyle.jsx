import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    text-decoration: none;
    outline : none;
    font-family: "Apple SD Gothic Neo",'Noto Sans KR', sans-serif;
  }
  body {
    display: flex;
    max-width: 1200px;
    /* overflow:hidden; */
    background-color: #F8F5F0;
  }
  html {
    font-size: 12px;
  }
`;

export default GlobalStyle;
