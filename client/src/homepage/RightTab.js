import React from "react";
import ControlPanel from "./ControlPanel";
import ReviewControlPanel from "./ReviewControlPanel";
import styled from "styled-components";
const RightTab = ({ start, stop, started }) => {
  return (
    <Wrapper>
      <ControlPanel start={start} stop={stop} started={started} />
      <ReviewControlPanel />
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
