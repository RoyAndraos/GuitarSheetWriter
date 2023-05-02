import React from "react";
import ControlPanel from "./ControlPanel";
import styled from "styled-components";

import TrackControlPanel from "./TrackControlPanel";

const RightTab = ({ start, stop }) => {
  return (
    <Wrapper>
      <ControlPanel start={start} stop={stop} />
      <TrackControlPanel />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 10px;
  width: 14%;
  display: flex;
  flex-direction: column;
  margin: 100px 0 100px 0;
  color: rgb(200, 200, 200);
  border-top: 2px solid white;
`;
export default RightTab;
