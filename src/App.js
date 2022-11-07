import GlobalStyle from "./shared/GlobalStyle";
import Page from "../src/shared/Router";
//

function App() {
  return (
    <div>
      <GlobalStyle />
      <h1>안녕하세요?</h1>
      <Page />
    </div>
  );
}

export default App;
