import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { calculateMeasureTime } from "../converters_and_helpers/helpers";
import clickSound from "../assets/click.wav";
import firstClickSound from "../assets/firstClick.wav";
import { FiVolume } from "react-icons/fi";
import { IoVolumeHighOutline } from "react-icons/io5";
import { RecordingContext } from "../Contexts/RecordingContext";
let intervalId;
const Metronome = ({ bpm, timeSignature }) => {
  const [activeLight, setActiveLight] = useState(0);
  const [visualOnly, setVisualOnly] = useState(true);
  const [lightElements, setLightElements] = useState([]);
  const measureTime = calculateMeasureTime(timeSignature, bpm) * 20;
  const beatTime = measureTime / parseInt(timeSignature.split("/")[0]);
  const numOfLights = parseInt(timeSignature.split("/")[0]);
  const { currentlyRecording } = useContext(RecordingContext);

  useEffect(() => {
    if (currentlyRecording) {
      intervalId = setInterval(() => {
        setActiveLight((activeLight) => (activeLight + 1) % numOfLights);
      }, beatTime);
    } else {
      setActiveLight(0);
    }
    return () => clearInterval(intervalId);
  }, [currentlyRecording, beatTime, numOfLights]);

  useEffect(() => {
    const click = new Audio(clickSound);
    const firstClick = new Audio(firstClickSound); // create a new Audio object
    if (currentlyRecording && !visualOnly) {
      if (activeLight === 0) {
        // play the click sound when the activeLight changes to 0 (the first beat)
        firstClick.play();
      } else {
        click.play();
      }
    }
  }, [activeLight, currentlyRecording]);
  useEffect(() => {
    if (numOfLights > 0) {
      setLightElements(Array(numOfLights).fill(null));
    } else {
      setLightElements([]);
    }
  }, [numOfLights]);

  const handleMetronomeSound = () => {
    setVisualOnly(!visualOnly);
  };

  return (
    <Wrapper>
      <MetronomeWrapper>
        {lightElements.fill(null).map((_, indx) => (
          <Light key={indx} active={indx === activeLight} />
        ))}
      </MetronomeWrapper>

      <Mute onClick={handleMetronomeSound}>
        {visualOnly ? <StyledVolumeMuted /> : <StyledVolume />}
      </Mute>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  border-bottom: 2px solid white;
  padding-bottom: 10px;
  align-items: center;
`;

const Light = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "white" : "gray")};
  margin-right: 10px;
`;

const Mute = styled.button`
  background-color: transparent;
  border: none;
  width: fit-content;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const StyledVolumeMuted = styled(FiVolume)`
  font-size: 25px;
  cursor: pointer;
  color: white;
`;

const StyledVolume = styled(IoVolumeHighOutline)`
  font-size: 25px;
  cursor: pointer;
  color: white;
`;
const MetronomeWrapper = styled.div`
  display: flex;
`;
export default Metronome;
