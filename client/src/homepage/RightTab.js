import React from "react";
import ControlPanel from "./ControlPanel";
import styled from "styled-components";
import Metronome from "./Metronome";
import TrackControlPanel from "./TrackControlPanel";

const RightTab = ({ start, stop, bpm, timeSignature, title }) => {
  return (
    <Wrapper>
      <Metronome bpm={bpm} timeSignature={timeSignature} />
      <ControlPanel start={start} stop={stop} />
      <TrackControlPanel
        bpm={bpm}
        timeSignature={timeSignature}
        title={title}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 10px;
  width: 14%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 100px 0 100px 0;
  color: rgb(200, 200, 200);
  border-top: 2px solid white;
  border-bottom: 2px solid white;
`;
export default RightTab;
