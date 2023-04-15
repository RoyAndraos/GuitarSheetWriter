import LeftTab from "./homepage/LeftTab";
import RightTab from "./homepage/RightTab";
import MusicSheet from "./homepage/MusicSheet";
import styled from "styled-components";
import AudioContext from "./converters_and_helpers/AudioContext";
import {
  updatePitch,
  calculateMeasureTime,
  decodeNoteArray,
} from "./converters_and_helpers/helpers";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState("rest");
  const [pitchScale, setPitchScale] = useState(0);
  const [pitch, setPitch] = useState("0 Hz");
  const [notification, setNotification] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [measureArrayLength, setMesureArrayLength] = useState();
  const [encodedNoteArray, setEncodedNoteArray] = useState([]);
  const [track, setTrack] = useState([]);
  const [formData, setFormData] = useState({
    bpm: "60",
    timeSignature: "4/4",
    topTimeSignature: "4",
    bottomTimeSignature: "4",
  });
  if (encodedNoteArray.length === measureArrayLength) {
    const measure = decodeNoteArray(
      encodedNoteArray,
      formData.bpm,
      formData.timeSignature
    );
    setTrack((current) => [...current, measure]);
    setEncodedNoteArray([]);
  }
  const audioCtx = AudioContext.getAudioContext();
  const analyserNode = AudioContext.getAnalyser();
  useEffect(() => {
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source, analyserNode]);

  const start = async () => {
    const input = await getMicInput();
    const measureLength = calculateMeasureTime(
      formData.timeSignature,
      formData.bpm
    );
    setMesureArrayLength(measureLength);
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setStart(true);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000);
    setSource(audioCtx.createMediaStreamSource(input));
    const id = setInterval(() => {
      updatePitch(audioCtx, analyserNode, setEncodedNoteArray);
    }, 20);
    setIntervalId(id);
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
    clearInterval(intervalId);
    setIntervalId(null);
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
      <LeftTab
        pitchNote={pitchNote}
        pitchScale={pitchScale}
        pitch={pitch}
        formData={formData}
        setFormData={setFormData}
      />
      <MusicSheet notification={notification} track={track} />
      <RightTab start={start} stop={stop} started={started} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1vh 1vw 0 1vw;
  position: relative;
  height: 93vh;
`;

export default HomePage;
