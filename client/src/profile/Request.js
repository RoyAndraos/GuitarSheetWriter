import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Wrapper, StyledTippy, TrackInfoContainer, Date } from "./TrackCard";
import { calculateMeasureTime } from "../converters_and_helpers/helpers";
import styled from "styled-components";
import { FetchMessageContext } from "../Contexts/FetchMessageContext";
import { StyledTrash, ManageTrack } from "./TrackCard";

const Request = ({ track_id, setProfile, profile }) => {
  const [trackInfo, setTrackInfo] = useState();
  const { setFetchMessage } = useContext(FetchMessageContext);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    fetch(`/trackInfo/${track_id}`)
      .then((res) => res.json())
      .then((result) => {
        setTrackInfo(result.data);
      });
  }, [track_id]);
  const handleSave = (e, username) => {
    e.preventDefault();
    const sendForm = { username: username, track_id: track_id };
    fetch("/saveTrack", {
      method: "POST",
      body: JSON.stringify(sendForm),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedProfile = {
        ...profile,
        track_ids: [...profile.track_ids, track_id],
      };
      setProfile(updatedProfile);
      setTrackInfo();
    });
  };

  const deleteRequest = (e, _id) => {
    e.preventDefault();
    fetch(`/deleteRequest/${_id}/${currentUser.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const updatedProfile = {
          ...profile,
          requests: [
            ...profile.requests.filter((element) => {
              return element !== _id;
            }),
          ],
        };
        setProfile(updatedProfile);
        setFetchMessage(result.message);
      });
  };
  if (!trackInfo) {
    return <p style={{ color: "black" }}>no requests at this time</p>;
  }
  return (
    <Wrapper>
      <StyledTippy
        content={
          <div>
            <p>writer: {trackInfo.author}</p>
            <p>
              length:{" "}
              {Math.round(
                calculateMeasureTime(trackInfo.timeSignature, trackInfo.tempo) *
                  (20 / 1000) *
                  trackInfo.measures.length
              )}
              s, {trackInfo.measures.length} measures
            </p>
            <p>time signature: {trackInfo.timeSignature}</p>
            <p>tempo: {trackInfo.tempo}bpm</p>
          </div>
        }
        placement="left"
      >
        <TrackInfoContainer style={{ color: "white" }}>
          <span>{trackInfo.title}</span>
          <Date>{trackInfo.creationDate}</Date>
        </TrackInfoContainer>
      </StyledTippy>
      <ManageTrack>
        <StyledTrash onClick={(e) => deleteRequest(e, track_id)} />
        <SaveTrack
          onClick={(e) => {
            handleSave(e, currentUser.username);
          }}
        >
          Save
        </SaveTrack>
      </ManageTrack>
    </Wrapper>
  );
};

const SaveTrack = styled.button`
  height: fit-content;
  margin-right: 10px;
  font-weight: 600;
  font-size: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.97);
  }
`;
export default Request;
