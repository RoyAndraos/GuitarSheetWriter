import styled from "styled-components";
import Note from "./Note";
const Measure = ({ measure }) => {
  return (
    <TabContainer>
      {measure.map((element, index) => {
        return <Note key={index} note={element.note} />;
      })}
    </TabContainer>
  );
};

const TabContainer = styled.div``;

export default Measure;
