import styled from "styled-components";
import { RecordingContext } from "../Contexts/RecordingContext";
import { useContext } from "react";
import { TrackContext } from "../Contexts/TrackContext";
import { UserContext } from "../Contexts/UserContext";

const TrackControlPanel = () => {
  const { currentlyRecording } = useContext(RecordingContext);
  const { setTrack, track } = useContext(TrackContext);
  const { currentUser } = useContext(UserContext);
  const handleSave = (e, track, currentUser) => {
    if (currentUser) {
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
      }).then(res=>res.json()).then(result=> setTrack({...track, 
        _id:result.data}));
    } else {
      window.alert("sign in or up first");
    }
  };
  const handleReset = () => {
    setTrack((curr) => ({ ...curr, track: [] }));
  };
  return (
    <Wrapper>
      <Save
        onClick={(e) => {
          handleSave(e, track, currentUser);
        }}
        disabled={currentlyRecording}
      >
        Save
      </Save>
      <Reset onClick={handleReset} disabled={currentlyRecording}>
        Reset
      </Reset>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  border-top: 2px solid white;
  justify-content: space-around;
`;
const Save = styled.button`
  border: none;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50px;
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
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.97);
  }
`;
export default TrackControlPanel;
