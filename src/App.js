import GlobalStyle from "./shared/GlobalStyle";
import Page from "../src/shared/Router";
import styled from "styled-components";
//

function App() {
  return (
    <View>
      <GlobalStyle />
      <Page />
    </View>
  );
}

export default App;

const View = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
`;
