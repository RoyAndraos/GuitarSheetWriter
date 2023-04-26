import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  z-index: 1;
`;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color:black
  }
`;

export default App;
