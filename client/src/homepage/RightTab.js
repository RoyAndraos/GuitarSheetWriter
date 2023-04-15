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
  background-color: rgba(25, 25, 25, 0.5);
  margin: 100px 0 100px 0;
  color: rgb(200, 200, 200);
`;
export default RightTab;
