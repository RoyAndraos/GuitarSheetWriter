import styled from "styled-components";
import { RecordingContext } from "../Contexts/RecordingContext";
import { useContext } from "react";
import { TrackContext } from "../Contexts/TrackContext";
import { UserContext } from "../Contexts/UserContext";
import { FetchMessageContext } from "../Contexts/FetchMessageContext";
const TrackControlPanel = () => {
  const { currentlyRecording } = useContext(RecordingContext);
  const { setTrack, track } = useContext(TrackContext);
  const { currentUser } = useContext(UserContext);
  const { setFetchMessage } = useContext(FetchMessageContext);
  const handleSave = (e, track, currentUser) => {
    if (track.measures.length !== 0) {
      if (currentUser) {
        const date = new Date("2022-05-01T12:30:00.000Z");
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const formattedDate = date.toLocaleString("en-US", options);
        track.creationDate = formattedDate;
        e.preventDefault();
        fetch("/addTrack", {
          method: "POST",
          body: JSON.stringify({
            track: track,
            currentUser: currentUser.username,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setTrack({ ...track, _id: result.data });
            setFetchMessage(result.message);
          });
      } else {
        setFetchMessage("sign in or up first");
      }
    } else {
      setFetchMessage("why would you save an empty track?");
    }
  };
  const handleReset = () => {
    setTrack((curr) => ({ ...curr, measures: [] }));
    setFetchMessage("track progress deleted");
  };
  return (
    <Wrapper>
      <SaveContainer>
        <Save
          onClick={(e) => {
            handleSave(e, track, currentUser);
          }}
          disabled={currentlyRecording}
        >
          Save
        </Save>
      </SaveContainer>
      <ResetContainer>
        <Reset onClick={handleReset} disabled={currentlyRecording}>
          Reset
        </Reset>
      </ResetContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-top: 2px solid white;
  justify-content: space-around;
  padding-bottom: 50px;
  padding-top: 50px;
  border-bottom: 2px solid white;
`;

const Save = styled.button`
  border: none;
  font-weight: 600;
  font-size: 20px;
  width: 80px;
  height: 30px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.97);
  }
`;
const Reset = styled.button`
  border: none;
  height: 30px;
  font-weight: 600;
  font-size: 20px;
  width: 80px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.97);
  }
`;

const SaveContainer = styled.div`
  border-radius: 3px;
  border-right: 3px solid rgba(200, 200, 200, 0.4);
  border-top: 3px solid rgba(200, 200, 200, 0.4);
  padding-right: 20px;
  padding-left: 20px;
`;
const ResetContainer = styled.div`
  border-radius: 3px;
  border-left: 3px solid rgba(200, 200, 200, 0.4);
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
  padding-right: 20px;
  padding-left: 20px;
`;

export default TrackControlPanel;
