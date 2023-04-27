import styled, { keyframes } from "styled-components";
import { FaCircle } from "react-icons/fa";
import { BsFillPauseFill } from "react-icons/bs";
import { RecordingContext } from "../Contexts/RecordingContext";
import { useContext } from "react";
import { TrackContext } from "../Contexts/TrackContext";
const ControlPanel = ({ start, stop }) => {
  const { currentlyRecording } = useContext(RecordingContext);
  const { track } = useContext(TrackContext);
  return (
    <Wrapper>
      <StyledButton onClick={start} disabled={currentlyRecording}>
        <StyledCircle />
      </StyledButton>
      <SecondStyledButton
        onClick={stop}
        disabled={!currentlyRecording || track.measures.length === 0}
      >
        <StyledPause />
      </SecondStyledButton>
      {currentlyRecording && <CurrentlyRecording />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-top: 2px solid white;
`;
const StyledButton = styled.button`
  font-size: 25px;
  appearance: none;
  background-color: transparent;
  border: none;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const SecondStyledButton = styled.button`
  font-size: 25px;
  appearance: none;
  background-color: transparent;
  border: none;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;
const StyledPause = styled(BsFillPauseFill)`
  border: none;
  transition: all 0.2s ease-in-out;
  font-size: 35px;
  color: white;
`;
const StyledCircle = styled(FaCircle)`
  color: red;
  outline: none;
  border: none;
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
