import styled, { keyframes } from "styled-components";
import { FaCircle } from "react-icons/fa";
import { FaSquare } from "react-icons/fa";

const ControlPanel = ({ start, stop, started }) => {
  return (
    <Wrapper>
      <StyledButton onClick={start} disabled={started}>
        <StyledCircle />
      </StyledButton>
      <StyledButton onClick={stop} disabled={!started}>
        <StyledSquare />
      </StyledButton>
      {started && <CurrentlyRecording />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const StyledButton = styled.button`
  font-size: 30px;
  appearance: none;
  background-color: transparent;
  border: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const StyledSquare = styled(FaSquare)`
  border: none;
  transition: all 0.2s ease-in-out;
  color: white;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const StyledCircle = styled(FaCircle)`
  color: red;
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const blinkAnimation = keyframes`
  0% {
    box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.5);
    opacity:1;
  }
  50% {
    box-shadow: none;
    opacity:0;

  }
  100% {
    box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.5);
    opacity:1;

  }
`;

const CurrentlyRecording = styled(FaCircle)`
  position: absolute;
  border-radius: 50%;
  color: rgb(190, 0, 0);
  z-index: 10;
  box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.5);
  animation: ${blinkAnimation} 1s infinite;
  left: 10%;
  top: 22%;
`;
export default ControlPanel;
