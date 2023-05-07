import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import Profile from "./profile/Profile";
import EditMusicSheet from "./profile/EditMusicSheet";
const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/:track_id" element={<EditMusicSheet />} />
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
    background-color: rgba(0,0,0,0.9);
    font-family: "Lato", sans-serif;
  }
`;

export default App;
