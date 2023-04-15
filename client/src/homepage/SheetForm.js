import React from "react";
import styled from "styled-components";

const SheetForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topTimeSignature") {
      const maxVal = "16";
      const minVal = "1";
      if (parseInt(value) > 16) {
        setFormData({
          ...formData,
          [name]: maxVal,
          timeSignature: `${maxVal}/${formData.bottomTimeSignature}`,
        });
        e.target.value = maxVal;
      } else if (parseInt(value) <= 0) {
        setFormData({
          ...formData,
          [name]: minVal,
          timeSignature: `${minVal}/${formData.bottomTimeSignature}`,
        });
        e.target.value = minVal;
      } else {
        setFormData({
          ...formData,
          [name]: value,
          timeSignature: `${value}/${formData.bottomTimeSignature}`,
        });
      }
    } else if (name === "bottomTimeSignature") {
      setFormData({
        ...formData,
        [name]: value,
        timeSignature: `${formData.topTimeSignature}/${value}`,
      });
    }
  };
  return (
    <StyledForm>
      <InputContainer>
        <label>Bpm</label>
        <Input
          defaultValue={"60"}
          type={"text"}
          name={"bpm"}
          onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
          onBlur={(e) => {
            const maxVal = "160";
            const minVal = "40";
            if (parseInt(e.target.value) < 40) {
              setFormData({ ...formData, bpm: minVal });
            } else if (parseInt(e.target.value) > 160) {
              setFormData({ ...formData, bpm: maxVal });
            }
          }}
        ></Input>
      </InputContainer>

      <InputContainer>
        <label>Time Signature</label>
        <div>
          <Input
            style={{ width: "10px", textAlign: "right" }}
            defaultValue={"4"}
            type={"text"}
            name={"topTimeSignature"}
            onChange={(e) => handleChange(e)}
          ></Input>
          /
          <SelectInput
            name={"bottomTimeSignature"}
            defaultValue={"4"}
            onChange={(e) => handleChange(e)}
          >
            <StyledOption value={"4"}>4</StyledOption>
            <StyledOption value={"8"}>8</StyledOption>
            <StyledOption value={"16"}>16</StyledOption>
          </SelectInput>
        </div>
      </InputContainer>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 30px;
  text-align: center;
  height: 12px;
  background-color: transparent;
  color: rgb(200, 200, 200);
  border: none;
  border: 2px solid;
  border-color: transparent;
  outline: none;
  &:focus {
    border: 2px solid;
    border-color: black grey grey black;
    outline: none;
  }
`;
const SelectInput = styled.select`
  border: none;
  appearance: none;
  background-color: transparent;
  color: rgb(200, 200, 200);
  &:focus {
    outline: none;
  }
`;
const StyledOption = styled.option`
  appearance: none;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 3vh;
`;
export default SheetForm;
