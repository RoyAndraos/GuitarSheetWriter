import styled from "styled-components";
import Note from "./Note";
const Measure = ({ measure }) => {
  return (
    <div>
      {measure.map((element, index) => {
        return <Note key={index} />;
      })}
    </div>
  );
};

export default Measure;
