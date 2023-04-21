import styled from "styled-components";
import Measure from "./Measure";
import SheetHeader from "./SheetHeader";
import { String, MesureNum } from "./Measure";
import { convertMeasureToDisplayFormat } from "../converters_and_helpers/helpers";
const MusicSheet = ({ notification, track, formData }) => {
  return (
    <Wrapper>
      <SheetHeader formData={formData} />
      {notification && (
        <Notification>bring your mic close your the guitar</Notification>
      )}
      <TabsWrapper>
        {track.length !== 0 ? (
          track.map((measure, index) => {
            return (
              <Measure
                key={index}
                measure={convertMeasureToDisplayFormat(measure)[0]}
                shift={convertMeasureToDisplayFormat(measure)[1]}
                index={index}
              />
            );
          })
        ) : (
          <div>
            <MesureNum>0</MesureNum>
            <String />
            <String />
            <String />
            <String />
            <String />
            <String />
          </div>
        )}
      </TabsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 60%;
  margin: 100px 0 100px 0;
  border: 1px solid black;
  position: relative;
  color: black;
  background-color: whitesmoke;
`;

const TabsWrapper = styled.div`
  margin: 10% 0 0 10%;
  display: flex;
  flex-wrap: wrap;
`;

const Notification = styled.p`
  width: fit-content;
  padding: 5px 10px 5px 10px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  font-weight: 600;
  border-radius: 30px;
  color: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

export default MusicSheet;
