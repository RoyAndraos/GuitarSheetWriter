import React from "react";
import styled from "styled-components";

const SheetForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topTimeSignature") {
      const maxVal = "32";
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
        <label>Title : </label>
        <Input
          style={{ width: "100px" }}
          type={"text"}
          name={"title"}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></Input>
      </InputContainer>

      <InputContainer>
        <label>Bpm :</label>
        <Input
          defaultValue={"60"}
          type={"text"}
          name={"bpm"}
          onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
          onBlur={(e) => {
            const maxVal = "210";
            const minVal = "40";
            if (parseInt(e.target.value) < 40) {
              setFormData({ ...formData, bpm: minVal });
              e.target.value = minVal;
            } else if (parseInt(e.target.value) > 210) {
              setFormData({ ...formData, bpm: maxVal });
              e.target.value = maxVal;
            }
          }}
        ></Input>
      </InputContainer>

      <InputContainer>
        <label>Time Signature :</label>
        <div style={{ color: "white" }}>
          <Input
            style={{ width: "15px", textAlign: "right" }}
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
  font-family: "Lato", sans-serif;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
`;
const Input = styled.input`
  text-align: center;
  width: 30px;
  height: 12px;
  background-color: transparent;
  color: white;
  border-color: transparent;
  outline: none;
  margin-left: 20px;
  font-style: italic;
  border-bottom: 2px solid;
  overflow: auto;
  &:focus {
    border-radius: 3px;
    outline: none;
  }
`;
const SelectInput = styled.select`
  border: none;
  appearance: none;
  background-color: transparent;
  color: white;
  font-style: italic;
  border-bottom: 2px solid;
  &:focus {
    outline: none;
  }
`;
const StyledOption = styled.option`
  appearance: none;
`;
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 2vh;
  justify-content: flex-start;
`;
export default SheetForm;
