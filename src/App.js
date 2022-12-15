import GlobalStyle from "./shared/GlobalStyle";
import Page from "../src/shared/Router";
import styled from "styled-components";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <View>
      <GlobalStyle />
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API}`}>
        <Page />
      </GoogleOAuthProvider>
    </View>
  );
}

export default App;

const View = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
`;
