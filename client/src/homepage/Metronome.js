import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { calculateMeasureTime } from "../converters_and_helpers/helpers";
import clickSound from "../assets/click.wav";
import firstClickSound from "../assets/firstClick.wav";
import { FiVolume } from "react-icons/fi";
import { IoVolumeHighOutline } from "react-icons/io5";
import { RecordingContext } from "../Contexts/RecordingContext";
import { TrackContext } from "../Contexts/TrackContext";
let intervalId;
const Metronome = () => {
  const { track } = useContext(TrackContext);
  const [activeLight, setActiveLight] = useState(0);
  const [visualOnly, setVisualOnly] = useState(true);
  const [lightElements, setLightElements] = useState([]);
  const measureTime =
    calculateMeasureTime(track.timeSignature, track.tempo) * 20;
  const beatTime = measureTime / parseInt(track.timeSignature.split("/")[0]);
  const numOfLights = parseInt(track.timeSignature.split("/")[0]);

  const { currentlyRecording } = useContext(RecordingContext);
  const [countdown, setCountdown] = useState(0);
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
    const firstClick = new Audio(firstClickSound);
    if (currentlyRecording && !visualOnly) {
      if (activeLight === 0) {
        // play the click sound when the activeLight changes to 0 (the first beat)
        firstClick.play();
      } else {
        click.play();
      }
    } else if (currentlyRecording && visualOnly) {
      const click = new Audio(clickSound);
      const firstClick = new Audio(firstClickSound);
      if (countdown <= numOfLights) {
        if (activeLight === 0) {
          firstClick.play();
          const newCountDown = countdown + 1;
          setCountdown(newCountDown);
        } else {
          click.play();
          const newCountDown = countdown + 1;
          setCountdown(newCountDown);
        }
      }
    }
    if (!currentlyRecording && visualOnly) {
      setCountdown(0);
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
  padding-bottom: 50px;
  padding-top: 50px;
  align-items: center;
`;

const Light = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "white" : "gray")};
  margin-right: 10px;
`;

const Mute = styled.button`
  background-color: transparent;
  border-radius: 3px;
  border: none;
  width: 50px;
  height: 45px;
  margin-left: 10px;
  transition: all 0.2s ease-in-out;
  border-top: 3px solid rgba(200, 200, 200, 0.4);
  border-left: 3px solid rgba(200, 200, 200, 0.4);
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const StyledVolumeMuted = styled(FiVolume)`
  font-size: 40px;
  cursor: pointer;
  color: white;
`;

const StyledVolume = styled(IoVolumeHighOutline)`
  font-size: 40px;
  cursor: pointer;
  color: white;
`;
const MetronomeWrapper = styled.div`
  display: flex;
  border-radius: 3px;
  border-right: 3px solid rgba(200, 200, 200, 0.4);
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
  padding: 10px 20px 10px 20px;
`;
export default Metronome;
