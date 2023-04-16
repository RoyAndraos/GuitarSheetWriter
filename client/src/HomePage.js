import LeftTab from "./homepage/LeftTab";
import RightTab from "./homepage/RightTab";
import MusicSheet from "./homepage/MusicSheet";
import styled from "styled-components";
import AudioContext from "./converters_and_helpers/AudioContext";
import {
  updatePitch,
  calculateMeasureTime,
} from "./converters_and_helpers/helpers";
import { useState } from "react";

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
  // const [pitchNote, setPitchNote] = useState("rest");
  // const [pitchScale, setPitchScale] = useState(0);
  // const [pitch, setPitch] = useState("0 Hz");
  // const [measureArrayLength, setMesureArrayLength] = useState();

  //if (encodedNoteArray.length === measureArrayLength) {
  //  const measure = decodeNoteArray(
  //    encodedNoteArray,
  //    formData.bpm,
  //    formData.timeSignature
  //  );
  //
  //  setTrack((current) => [...current, measure]);
  //  setEncodedNoteArray([]);
  //}
  const audioCtx = AudioContext.getAudioContext();
  const analyserNode = AudioContext.getAnalyser();

  const start = async () => {
    const getMicInput = async () => {
      return navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          autoGainControl: false,
          noiseSuppression: false,
          latency: 0,
        },
      });
    };
    const input = await getMicInput();
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    const measureLength = calculateMeasureTime(
      formData.timeSignature,
      formData.bpm
    );

    setStart(true);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000);
    const src = audioCtx.createMediaStreamSource(input);
    src.connect(analyserNode);
    setSource(src);
    myInterval = setInterval(() => {
      console.log(
        updatePitch(
          audioCtx,
          analyserNode,
          formData.bpm,
          formData.timeSignature
        )
      );
      updatePitch(
        audioCtx,
        analyserNode,
        formData.bpm,
        formData.timeSignature,
        measureLength
      );
    }, 20);
  };

  const stop = () => {
    source.disconnect(analyserNode);
    setStart(false);
    clearInterval(myInterval);
  };

  return (
    <Wrapper>
      <LeftTab
        // pitchNote={pitchNote}
        // pitchScale={pitchScale}
        // pitch={pitch}
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
