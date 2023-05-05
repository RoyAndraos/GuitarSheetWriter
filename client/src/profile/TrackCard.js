import React, { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { UserContext } from "../Contexts/UserContext";
import { calculateMeasureTime } from "../converters_and_helpers/helpers.js";
import Send from "./Send";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TrackContext } from "../Contexts/TrackContext";
import { FetchMessageContext } from "../Contexts/FetchMessageContext";
const TrackCard = ({ track_id, setProfile, profile }) => {
  const { currentUser } = useContext(UserContext);
  const { setTrack } = useContext(TrackContext);
  const [trackInfo, setTrackInfo] = useState();
  const [author, setAuthor] = useState();
  const [sendingProcess, setSendingProcess] = useState(false);
  const navigate = useNavigate();
  const { setFetchMessage } = useContext(FetchMessageContext);
  useEffect(() => {
    fetch(`/trackInfo/${track_id}`)
      .then((res) => res.json())
      .then((result) => {
        setTrackInfo(result.data);
        if (currentUser.username === result.data.author) {
          setAuthor("you");
        } else {
          setAuthor(result.data.author);
        }
      });
  }, [track_id]);

  const deleteTrack = (e, _id) => {
    e.preventDefault();
    fetch(`/deleteTrack/${_id}/${currentUser.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const updatedProfile = {
          ...profile,
          track_ids: profile.track_ids.filter((id) => id !== track_id),
        };
        setProfile(updatedProfile);
        setFetchMessage(result.message);
      });
  };

  const handleSendingProcess = () => {
    setSendingProcess(!sendingProcess);
  };

  if (!trackInfo) {
    return <p>...loading</p>;
  } else {
    return (
      <Wrapper
        onClick={(e) => {
          e.preventDefault();
          if (
            Object.entries(e.target)[0][1].elementType === "div" ||
            Object.entries(e.target)[0][1].elementType === "span"
          ) {
            setTrack(trackInfo);
            navigate(`/${trackInfo._id}`);
          }
        }}
      >
        <StyledTippy
          content={
            <div>
              <p>writer: {author}</p>
              <p>
                length:{" "}
                {Math.round(
                  calculateMeasureTime(
                    trackInfo.timeSignature,
                    trackInfo.tempo
                  ) *
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
          <TrackInfoContainer>
            <SongTitle>{trackInfo.title}</SongTitle>
            <Date>{trackInfo.creationDate}</Date>
          </TrackInfoContainer>
        </StyledTippy>
        <ManageTrack>
          <StyledTrash onClick={(e) => deleteTrack(e, trackInfo._id)} />
          <SendTrack onClick={handleSendingProcess}>Send</SendTrack>
        </ManageTrack>
        {sendingProcess && (
          <Send
            _id={trackInfo._id}
            sendingProcess={sendingProcess}
            setSendingProcess={setSendingProcess}
          />
        )}
      </Wrapper>
    );
  }
};

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 350px;
  height: 60px;
  justify-content: space-between;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 30px;
  }
`;

const SendTrack = styled.button`
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

export const TrackInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  line-height: 20px;
`;

export const Date = styled.span`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.6;
  color: white;
`;

export const StyledTippy = styled(Tippy)`
  margin-right: 15px;
  background-color: rgba(0, 0, 0, 0.9);
  width: 200px;
  text-align: right;
  font-size: 15px;
`;

export const ManageTrack = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTrash = styled(FaTrash)`
  margin-right: 20px;
  color: white;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.97);
  }
`;

const SongTitle = styled.span`
  color: white;
`;
export default TrackCard;
