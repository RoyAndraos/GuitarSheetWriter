import React from "react";
import SheetForm from "./SheetForm";
import styled from "styled-components";

const LeftTab = ({ formData, setFormData }) => {
  return (
    <Wrapper>
      <SheetForm formData={formData} setFormData={setFormData} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 14%;
  padding: 20px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 100px 0 0 0;
  color: white;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
`;
export default LeftTab;
