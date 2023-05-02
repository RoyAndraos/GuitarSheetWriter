import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CloseButton } from "../SignIn/SignForm";
import { Input, fadeIn, Warning, StyledAccount } from "../SignIn/SignUp";
import { BackButton } from "../SignIn/Login";
import { FaArrowLeft } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { UserContext } from "../Contexts/UserContext";
import { FetchMessageContext } from "../Contexts/FetchMessageContext";

const Send = ({ _id, sendingProcess, setSendingProcess }) => {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState();
  const { currentUser } = useContext(UserContext);
  const { setFetchMessage } = useContext(FetchMessageContext);
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`/search/${username}`)
      .then((res) => res.json())
      .then((result) => {
        setSearchResult(
          result.data.filter((user) => {
            return currentUser.username !== user.username;
          })
        );
      });
  };

  const handleSend = (e, username) => {
    e.preventDefault();
    const sendForm = { username: username, track_id: _id };
    fetch("/sendTrack", {
      method: "POST",
      body: JSON.stringify(sendForm),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setFetchMessage(result.message));
    setSendingProcess(!sendingProcess);
  };
  return (
    <Wrapper>
      {!searchResult ? (
        <Container>
          <CloseButton
            onClick={() => {
              setSendingProcess(!sendingProcess);
            }}
          >
            X
          </CloseButton>
          <Warning>search by username</Warning>
          <StyledAccount />
          <SearchBar>
            <Input
              type="text"
              placeholder="Username"
              name={"username"}
              required={true}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Submit
              onClick={(e) => {
                handleSearch(e);
              }}
            >
              <StyledSearch style={{ position: "relative", top: "4px" }} />
            </Submit>
          </SearchBar>
        </Container>
      ) : (
        <Container>
          <BackButton
            onClick={() => {
              setSearchResult(null);
            }}
          >
            <FaArrowLeft />
          </BackButton>
          <CloseButton
            onClick={() => {
              setSendingProcess(!sendingProcess);
            }}
          >
            X
          </CloseButton>
          <Warning>users found:</Warning>
          {searchResult.map((user) => {
            return (
              <>
                <StyledTippy
                  placement="left"
                  key={user.username}
                  content={<div>{`send track to ${user.username}`}</div>}
                >
                  <SendButton
                    key={user.username}
                    onClick={(e) => handleSend(e, user.username)}
                  >
                    {user.username}
                  </SendButton>
                </StyledTippy>
              </>
            );
          })}
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10;
`;
const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  width: 500px;
  height: 600px;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

const Submit = styled.button`
  height: 56px;
  margin-left: 10px;
  background-color: #d1560e;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: transparent;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.05);
  }
`;
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSearch = styled(FaSearch)`
  border: none;
  border-radius: 3px;
  color: whitesmoke;
  font-weight: 600;
  font-size: 40px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: transparent;
    color: #d1560e;
    transform: scale(1.1);
  }
`;

const SendButton = styled.button`
  background-color: whitesmoke;
  font-size: 25px;
  border: none;
  border-radius: 4px;
  padding: 10px 20px 10px 20px;
  transition: all 0.5s ease-in-out;
  margin-top: 100px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    font-size: 26px;
  }
`;
const StyledTippy = styled(Tippy)`
  font-size: 15px;
  width: 400px;
`;
export default Send;
