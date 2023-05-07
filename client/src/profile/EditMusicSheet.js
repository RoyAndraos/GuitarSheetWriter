import { useContext, useState } from "react";
import { TrackContext } from "../Contexts/TrackContext";
import SheetFooter from "../homepage/SheetFooter";
import SheetHeader from "../homepage/SheetHeader";
import { TabsWrapper } from "../homepage/MusicSheet";
import EditMeasure from "./EditMeasure";
import styled from "styled-components";
import { convertMeasureToDisplayFormat } from "../converters_and_helpers/helpers";
import { UserContext } from "../Contexts/UserContext";

const EditMusicSheet = () => {
  const { track, setTrack } = useContext(TrackContext);
  const { currentUser } = useContext(UserContext);
  const [trackCopy, setTrackCopy] = useState(track);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updatedNote, setUpdatedNote] = useState(null);
  const handleBackgroundClick = (e) => {
    e.preventDefault();
    if (updatedNote) {
      const updatedTrackCopy = { ...trackCopy };
      const noteIndexToUpdate = convertMeasureToDisplayFormat(
        trackCopy.measures[updatedNote.measureIndex]
      )[0].findIndex((element) => {
        return element.divShift === updatedNote.divShift;
      });
      const noteObject =
        updatedTrackCopy.measures[updatedNote.measureIndex][noteIndexToUpdate];
      noteObject.note.fret = updatedNote.newValue;
      setTrackCopy(updatedTrackCopy);
      setUpdatedNote(null);
    }
    setSelectedNote(null);
  };

  const handleSave = (e) => {
    const date = new Date("2022-05-01T12:30:00.000Z");
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    trackCopy.updateDate = formattedDate;
    e.preventDefault();
    fetch("/updateTrack", {
      method: "POST",
      body: JSON.stringify({
        track: trackCopy,
        currentUser: currentUser.username,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setTrack(result.data));
  };

  return (
    <Wrapper
      onClick={(e) => {
        handleBackgroundClick(e);
      }}
    >
      <SheetHeader />
      <TabsWrapper>
        {trackCopy.measures.map((measure, index) => {
          return (
            <EditMeasure
              key={index}
              measure={convertMeasureToDisplayFormat(measure)[0]}
              shift={convertMeasureToDisplayFormat(measure)[1]}
              index={index}
              handleBackgroundClick={handleBackgroundClick}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              setUpdatedNote={setUpdatedNote}
            />
          );
        })}
      </TabsWrapper>
      <SheetFooter />
      {track !== trackCopy && (
        <Save
          onClick={(e) => {
            handleSave(e);
          }}
        >
          Save Changes
        </Save>
      )}
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
  left: 50%;
  transform: translateX(-50%);
`;
const Save = styled.button`
  position: absolute;
  top: 15px;
  right: 35px;
  border: none;
  background-color: green;
  border-radius: 30px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  width: 100px;
  padding: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.96);
  }
`;
export default EditMusicSheet;
