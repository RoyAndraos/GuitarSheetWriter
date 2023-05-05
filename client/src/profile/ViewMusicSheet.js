import { useContext } from "react";
import { TrackContext } from "../Contexts/TrackContext";
import SheetFooter from "../homepage/SheetFooter";
import SheetHeader from "../homepage/SheetHeader";
import { TabsWrapper } from "../homepage/MusicSheet";
import Measure from "../homepage/Measure";
import styled from "styled-components";
import { convertMeasureToDisplayFormat } from "../converters_and_helpers/helpers";
const ViewMusicSheet = () => {
  const { track } = useContext(TrackContext);
  return (
    <Wrapper>
      <SheetHeader />
      <TabsWrapper>
        {track.measures.map((measure, index) => {
          return (
            <Measure
              key={index}
              measure={convertMeasureToDisplayFormat(measure)[0]}
              shift={convertMeasureToDisplayFormat(measure)[1]}
              index={index}
            />
          );
        })}
      </TabsWrapper>
      <SheetFooter />
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
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

export default ViewMusicSheet;
