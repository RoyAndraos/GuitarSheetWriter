import React, { useContext } from "react";
import styled from "styled-components";
import { RecordingContext } from "../Contexts/RecordingContext";
import { TrackContext } from "../Contexts/TrackContext";
const SheetForm = () => {
  const { track, setTrack } = useContext(TrackContext)
  const { currentlyRecording } = useContext(RecordingContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topTimeSignature") {
      const maxVal = "32";
      const minVal = "1";
      if (parseInt(value) > 16) {
        setTrack({
          ...track,
          [name]: maxVal,
          timeSignature: `${maxVal}/${track.bottomTimeSignature}`,
        });
        e.target.value = maxVal;
      } else if (parseInt(value) <= 0) {
        setTrack({
          ...track,
          [name]: minVal,
          timeSignature: `${minVal}/${track.bottomTimeSignature}`,
        });
        e.target.value = minVal;
      } else {
        setTrack({
          ...track,
          [name]: value,
          timeSignature: `${value}/${track.bottomTimeSignature}`,
        });
      }
    } else if (name === "bottomTimeSignature") {
      setTrack({
        ...track,
        [name]: value,
        timeSignature: `${track.topTimeSignature}/${value}`,
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
          onChange={(e) => setTrack({ ...track, title: e.target.value })}
          disabled={currentlyRecording}
        ></Input>
      </InputContainer>

      <InputContainer>
        <label>Tempo :</label>
        <Input
          defaultValue={"60"}
          type={"text"}
          name={"tempo"}
          disabled={currentlyRecording}
          onChange={(e) => setTrack({ ...track, tempo: e.target.value })}
          onBlur={(e) => {
            const maxVal = "210";
            const minVal = "40";
            if (parseInt(e.target.value) < 40) {
              setTrack({ ...track, tempo: minVal });
              e.target.value = minVal;
            } else if (parseInt(e.target.value) > 210) {
              setTrack({ ...track, tempo: maxVal });
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
            disabled={currentlyRecording}
          ></Input>
          /
          <SelectInput
            name={"bottomTimeSignature"}
            defaultValue={"4"}
            onChange={(e) => handleChange(e)}
            disabled={currentlyRecording}
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
  color: black;
`;
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 2vh;
  justify-content: flex-start;
`;
export default SheetForm;
