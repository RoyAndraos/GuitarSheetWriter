import styled from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";

const App = () => {
  return (
    <Wrapper>
      <Header />
      <HomePage />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

export default App;
