import styled from "styled-components";
import { useState, useEffect } from "react";

const Measure = ({ measure, shift, index }) => {
  const [firstStr, setFirstStr] = useState([]);
  const [secondStr, setSecondStr] = useState([]);
  const [thirdStr, setThirdStr] = useState([]);
  const [fourthStr, setFourthStr] = useState([]);
  const [fifthStr, setFifthStr] = useState([]);
  const [sixthStr, setSixthStr] = useState([]);

  useEffect(() => {
    const first = measure.filter((element) => {
      return element.note.string === "1";
    });
    const second = measure.filter((element) => {
      return element.note.string === "2";
    });
    const third = measure.filter((element) => {
      return element.note.string === "3";
    });
    const fourth = measure.filter((element) => {
      return element.note.string === "4";
    });
    const fifth = measure.filter((element) => {
      return element.note.string === "5";
    });
    const sixth = measure.filter((element) => {
      return element.note.string === "6";
    });
    setFirstStr(first);
    setSecondStr(second);
    setThirdStr(third);
    setFourthStr(fourth);
    setFifthStr(fifth);
    setSixthStr(sixth);
  }, [measure]);

  return (
    <Wrapper>
      <MesureNum>{index}</MesureNum>
      <String>
        {firstStr.length !== 0 &&
          firstStr.map((element) => {
            return (
              <Note
                key={element.divShift}
                totalShift={shift}
                shift={element.divShift}
              >
                {element.note.fret}
              </Note>
            );
          })}
      </String>
      <String>
        {secondStr.length !== 0 &&
          secondStr.map((element) => {
            return (
              <Note
                key={element.divShift}
                totalShift={shift}
                shift={element.divShift}
              >
                {element.note.fret}
              </Note>
            );
          })}
      </String>
      <String>
        {thirdStr.length !== 0 &&
          thirdStr.map((element) => {
            return (
              <Note
                key={element.divShift}
                totalShift={shift}
                shift={element.divShift}
              >
                {element.note.fret}
              </Note>
            );
          })}
      </String>
      <String>
        {fourthStr.length !== 0 &&
          fourthStr.map((element) => {
            return (
              <Note
                key={element.divShift}
                totalShift={shift}
                shift={element.divShift}
              >
                {element.note.fret}
              </Note>
            );
          })}
      </String>
      <String>
        {fifthStr.length !== 0 &&
          fifthStr.map((element) => {
            return (
              <Note
                key={element.divShift}
                totalShift={shift}
                shift={element.divShift}
              >
                {element.note.fret}
              </Note>
            );
          })}
      </String>
      <String>
        {sixthStr.length !== 0 &&
          sixthStr.map((element) => {
            return (
              <Note
                key={element.divShift}
                totalShift={shift}
                shift={element.divShift}
              >
                {element.note.fret}
              </Note>
            );
          })}
      </String>
    </Wrapper>
  );
};

const Note = styled.p`
  position: relative;
  left: ${(props) => (props.shift * 80) / props.totalShift}%;
  top: -9px;
  margin: 0;
  margin-left: 10px;
  width: fit-content;
  padding: 0 2px 0 2px;
  background-color: whitesmoke;
  &:hover {
    border-radius: 3px;
    background-color: #ccccff;
    cursor: default;
  }
`;
const Wrapper = styled.div`
  border-bottom: none;
`;
export const String = styled.div`
  display: flex;
  width: 15vw;
  height: 20px;
  border: 1px solid black;
  &:last-of-type {
    border-bottom: none;
    border-left: none;
    border-right: none;
  }
`;
export const MesureNum = styled.p`
  font-size: 10px;
  font-weight: 600;
  opacity: 0.4;
`;
export default Measure;
