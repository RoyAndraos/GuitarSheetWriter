import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TrackCard from "./TrackCard";
import { UserContext } from "../Contexts/UserContext";
import Request from "./Request";
import { TrackContext } from "../Contexts/TrackContext";
import { FetchMessageContext } from "../Contexts/FetchMessageContext";
import { FiLogOut } from "react-icons/fi";
import { FiBox } from "react-icons/fi";
import Message from "../homepage/Message";
import Spinner from "./Spinner";

const Profile = () => {
  const params = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setTrack } = useContext(TrackContext);
  const { setFetchMessage } = useContext(FetchMessageContext);
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  useEffect(() => {
    fetch(`/profile/${params.username}`)
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.data);
      });
  }, [params]);

  const handleLogOut = (e) => {
    e.preventDefault();
    setCurrentUser(null);
    setTrack({
      measures: [],
      title: "",
      tempo: "60",
      timeSignature: "4/4",
    });
    setFetchMessage("you are logged out");
  };

  if (!profile) {
    <Wrapper>
      <Spinner />
    </Wrapper>;
  } else {
    return (
      <Wrapper>
        <LogOutContainer
          onClick={(e) => {
            handleLogOut(e);
          }}
        >
          <LogOut>Log Out</LogOut> <StyledLogout />
        </LogOutContainer>
        <TrackCardContainer>
          <Title
            style={{
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Your Tracks
          </Title>
          {profile.track_ids.length !== 0 ? (
            profile.track_ids.map((element) => {
              return (
                <TrackCard
                  track_id={element}
                  key={element}
                  profile={profile}
                  setProfile={setProfile}
                />
              );
            })
          ) : (
            <TrackEmptyContainer>
              <StyledCube />
              <StyledNoNotifs>looks like you have no tracks</StyledNoNotifs>
            </TrackEmptyContainer>
          )}
        </TrackCardContainer>
        <NotificationContainer>
          <Title
            style={{
              color: " rgba(0,0,0,0.8)",
            }}
          >
            Notifications
          </Title>
          {profile.requests.length !== 0 ? (
            profile.requests.map((element) => {
              return (
                <Request
                  track_id={element}
                  key={element}
                  setProfile={setProfile}
                  profile={profile}
                />
              );
            })
          ) : (
            <EmptyContainer>
              <StyledCube />
              <StyledNoNotifs>looks like you have no new tracks</StyledNoNotifs>
            </EmptyContainer>
          )}
        </NotificationContainer>
        <MessageContainer>
          <Message />
        </MessageContainer>
      </Wrapper>
    );
  }
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const TrackCardContainer = styled.div`
  background-color: whitesmoke;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  width: 360px;
  height: 50vh;
  margin-right: 10px;
  position: relative;
`;

const NotificationContainer = styled.div`
  background-color: whitesmoke;
  position: relative;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  width: 360px;
  height: 50vh;
  margin-left: 10px;
`;

const LogOut = styled.button`
  border: none;
  font-weight: 600;
  background-color: transparent;
  color: whitesmoke;
  border-bottom: 2px white solid;
  transition: all 0.2s ease-in-out;
  width: fit-content;
  font-size: 30px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const StyledLogout = styled(FiLogOut)`
  color: white;
  font-size: 30px;
  margin-left: 20px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const LogOutContainer = styled.div`
  position: fixed;
  top: 12%;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const StyledCube = styled(FiBox)`
  font-size: 200px;
  opacity: 0.6;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
const EmptyContainer = styled.div`
  text-align: center;
`;

const TrackEmptyContainer = styled.div`
  text-align: center;
`;

const StyledNoNotifs = styled.p`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.6;
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.h1`
  color: white;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 40px;
  padding-bottom: 5px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.8);
`;

const MessageContainer = styled.div`
  position: absolute;
  width: 300px;
  top: -48px;
`;

export default Profile;
