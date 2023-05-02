import styled from "styled-components";
import Measure from "./Measure";
import SheetHeader from "./SheetHeader";
import { String, MesureNum } from "./Measure";
import { convertMeasureToDisplayFormat } from "../converters_and_helpers/helpers";
import SheetFooter from "./SheetFooter";
import { TrackContext } from "../Contexts/TrackContext";
import { useContext } from "react";
const MusicSheet = ({ notification }) => {
  const { track } = useContext(TrackContext);
  return (
    <Wrapper>
      <SheetHeader />
      {notification && (
        <Notification>bring your mic close to your guitar</Notification>
      )}
      <TabsWrapper>
        {track.measures.length !== 0 ? (
          track.measures.map((measure, index) => {
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
      <SheetFooter />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 60%;
  margin: 100px 0 200px 0;
  border: 1px solid black;
  position: relative;
  color: black;
  background-color: whitesmoke;
`;

export const TabsWrapper = styled.div`
  margin: 50px 50px 0 50px;
  display: flex;
  justify-content: center;
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
