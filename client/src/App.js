import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <HomePage />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color:black
  }
`;

export default App;
