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
import { FetchMessageContext } from "./Contexts/FetchMessageContext";
let myInterval;
const HomePage = () => {
  const [source, setSource] = useState(null);
  const [notification, setNotification] = useState(false);
  const { track, setTrack } = useContext(TrackContext);
  const audioCtx = AudioContext.getAudioContext();
  const analyserNode = AudioContext.getAnalyser();
  const { setCurrentlyRecording, currentlyRecording } =
    useContext(RecordingContext);
  const { setFetchMessage } = useContext(FetchMessageContext);
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
    setCurrentlyRecording(!currentlyRecording);
    setNotification(true);
    setFetchMessage("first measure countdown started");
    setTimeout(() => setNotification(false), 5000);
    let countdown = calculateMeasureTime(track.timeSignature, track.tempo) * 20;
    const beatTime = countdown / parseInt(track.timeSignature.split("/")[0]);
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
            track.tempo,
            track.timeSignature
          );
        }, 20);
      }
    }, beatTime);
  };

  const stop = () => {
    setFetchMessage("");
    resetEncodedNoteArray();
    source.disconnect(analyserNode);
    setCurrentlyRecording(!currentlyRecording);
    clearInterval(myInterval);
    setFetchMessage("recording stopped");
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
      <LeftTab />
      <MusicSheet notification={notification} />
      <RightTab start={start} stop={stop} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1vh 1vw 0 1vw;
  position: relative;
`;

export default HomePage;
