import styled from "styled-components";
import Measure from "./Measure";
import SheetHeader from "./SheetHeader";

const MusicSheet = ({ notification, track }) => {
  return (
    <Wrapper>
      <SheetHeader />
      {notification && (
        <Notification>bring your mic close to the guitar</Notification>
      )}
      <TabsWrapper>
        {track &&
          track.map((measure, index) => {
            return <Measure key={index} measure={measure} />;
          })}
      </TabsWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 50%;
  margin: 100px 0 100px 0;
`;
const TabsWrapper = styled.div`
  margin: 10% 0 0 10%;
  display: flex;
  justify-content: center;
  background-color: rgba(240, 240, 240);
`;

const Notification = styled.p`
  width: fit-content;
  padding: 5px 10px 5px 10px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  font-weight: 600;
  border-radius: 10%;
  color: rgba(0, 0, 0, 0.7);
`;
export default MusicSheet;
