import styled, { keyframes } from "styled-components";
import { FaCircle } from "react-icons/fa";
import { BsFillPauseFill } from "react-icons/bs";
import { RecordingContext } from "../Contexts/RecordingContext";
import { useContext, useState } from "react";
import { TrackContext } from "../Contexts/TrackContext";

const ControlPanel = ({ start, stop }) => {
  const { currentlyRecording } = useContext(RecordingContext);
  const { track } = useContext(TrackContext);
  const [initialTrack, setInitialTrack] = useState(0);

  return (
    <Wrapper>
      <StyledButton onClick={start} disabled={!!currentlyRecording}>
        <StyledCircle />
      </StyledButton>
      <SecondStyledButton
        onClick={() => {
          stop();
          setInitialTrack(track.measures.length);
        }}
        disabled={
          !currentlyRecording ||
          track.measures.length === 0 ||
          initialTrack === track.measures.length
        }
      >
        <StyledPause />
      </SecondStyledButton>
      {currentlyRecording && <CurrentlyRecording />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  padding-top: 50px;
  padding-bottom: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const StyledButton = styled.button`
  border: none;
  margin-right: 10px;
  appearance: none;
  background-color: transparent;
  border-radius: 3px;
  border-left: 3px solid rgba(200, 200, 200, 0.4);
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
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
  }
`;

const SecondStyledButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  border-right: 3px solid rgba(200, 200, 200, 0.6);
  border-top: 3px solid rgba(200, 200, 200, 0.6);
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
  font-size: 60px;
  color: white;
`;
const StyledCircle = styled(FaCircle)`
  color: red;
  outline: none;
  border: none;
  padding: 9px;
  font-size: 40px;
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
  top: 50%;
  transform: translateY(-50%);
`;
export default ControlPanel;
