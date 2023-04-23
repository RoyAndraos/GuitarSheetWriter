import LeftTab from "./homepage/LeftTab";
import RightTab from "./homepage/RightTab";
import MusicSheet from "./homepage/MusicSheet";
import styled from "styled-components";
import AudioContext from "./converters_and_helpers/AudioContext";
import { updatePitch } from "./converters_and_helpers/helpers";
import { useState, useEffect } from "react";

let myInterval;
const HomePage = () => {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [notification, setNotification] = useState(false);
  const [track, setTrack] = useState([]);
  const [formData, setFormData] = useState({
    bpm: "60",
    timeSignature: "4/4",
    topTimeSignature: "4",
    bottomTimeSignature: "4",
  });
  const audioCtx = AudioContext.getAudioContext();
  const analyserNode = AudioContext.getAnalyser();
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
    setStart(true);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000);
    const src = audioCtx.createMediaStreamSource(input);
    src.connect(analyserNode);
    setSource(src);
    myInterval = setInterval(() => {
      updatePitch(
        audioCtx,
        analyserNode,
        setTrack,
        formData.bpm,
        formData.timeSignature
      );
    }, 20);
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
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
      <MusicSheet
        notification={notification}
        track={track}
        formData={formData}
      />
      <RightTab start={start} stop={stop} started={started} />
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
