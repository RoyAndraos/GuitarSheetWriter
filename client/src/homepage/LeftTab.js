import SheetForm from "./SheetForm";
import styled from "styled-components";
import Message from "./Message";
import Metronome from "./Metronome";

const LeftTab = () => {
  return (
    <Wrapper>
      <Metronome />
      <SheetForm />
      <Message />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 14%;
  padding: 20px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 100px 0 0 0;
  color: white;
  border-top: 2px solid white;
`;
export default LeftTab;
