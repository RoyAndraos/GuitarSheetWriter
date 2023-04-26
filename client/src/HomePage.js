import LeftTab from "./homepage/LeftTab";
import RightTab from "./homepage/RightTab";
import MusicSheet from "./homepage/MusicSheet";
import styled from "styled-components";
import AudioContext from "./converters_and_helpers/AudioContext";
import {
  resetEncodedNoteArray,
  updatePitch,
  calculateMeasureTime,
} from "./converters_and_helpers/helpers";
import { useState, useEffect, useContext } from "react";
import { RecordingContext } from "./Contexts/RecordingContext";
import { TrackContext } from "./Contexts/TrackContext";
let myInterval;
const HomePage = () => {
  const [source, setSource] = useState(null);
  const [notification, setNotification] = useState(false);
  const [formData, setFormData] = useState({
    bpm: "60",
    timeSignature: "4/4",
    topTimeSignature: "4",
    bottomTimeSignature: "4",
  });
  const { setTrack } = useContext(TrackContext);
  const audioCtx = AudioContext.getAudioContext();
  const analyserNode = AudioContext.getAnalyser();
  const { setCurrentlyRecording } = useContext(RecordingContext);
  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source, analyserNode]);

  const start = async () => {
    const input = await getMicInput();
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setCurrentlyRecording(true);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000);
    let countdown =
      calculateMeasureTime(formData.timeSignature, formData.tempo) * 20;
    const beatTime = countdown / parseInt(formData.timeSignature.split("/")[0]);
    const countdownInterval = setInterval(async () => {
      countdown = countdown - beatTime;
      if (countdown === 0) {
        clearInterval(countdownInterval);
        const src = audioCtx.createMediaStreamSource(input);
        src.connect(analyserNode);
        setSource(src);
        myInterval = setInterval(() => {
          updatePitch(
            audioCtx,
            analyserNode,
            setTrack,
            formData.tempo,
            formData.timeSignature
          );
        }, 20);
      }
    }, beatTime);
  };

  const stop = () => {
    resetEncodedNoteArray();
    source.disconnect(analyserNode);
    setCurrentlyRecording(false);
    clearInterval(myInterval);
  };

  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };
  return (
    <Wrapper>
      <LeftTab formData={formData} setFormData={setFormData} />
      <MusicSheet notification={notification} formData={formData} />
      <RightTab
        start={start}
        stop={stop}
        bpm={formData.tempo}
        timeSignature={formData.timeSignature}
        title={formData.title}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1vh 1vw 0 1vw;
  position: relative;
  font-family: "Lato", sans-serif;
`;

export default HomePage;
