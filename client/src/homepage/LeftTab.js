import React from "react";
import SheetForm from "./SheetForm";
import CurrentNote from "./CurrentNote";
import styled from "styled-components";
const LeftTab = ({ formData, setFormData }) => {
  return (
    <Wrapper>
      <SheetForm formData={formData} setFormData={setFormData} />
      <CurrentNote />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 14%;

  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 100px 0 0 0;
  color: rgb(200, 200, 200);
  background-color: rgba(25, 25, 25, 0.5);
`;
export default LeftTab;
