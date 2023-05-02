import styled, { keyframes } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { FaGuitar } from "react-icons/fa";
import { useState, useContext } from "react";
import SignForm from "./SignIn/SignForm";
import { UserContext } from "./Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { RecordingContext } from "./Contexts/RecordingContext";

const Header = () => {
  const [showingForm, setShowingForm] = useState(false);
  const { currentlyRecording } = useContext(RecordingContext);
  const { currentUser } = useContext(UserContext);

  const navToProfile = () => {
    if (currentUser) {
      navigate(`/profile/${currentUser.username}`);
    } else {
      setShowingForm(!showingForm);
    }
  };
  const navToHomePage = () => {
    navigate("/");
  };

  const navigate = useNavigate();
  return (
    <Wrapper>
      {showingForm && (
        <SignForm setShowingForm={setShowingForm} showingForm={showingForm} />
      )}
      <StyledButton onClick={navToHomePage}>
        <StyledLogo />
      </StyledButton>
      <StyledButton onClick={navToProfile} disabled={currentlyRecording}>
        {currentUser ? (
          <Title>{currentUser.username}</Title>
        ) : (
          <StyledAccount />
        )}
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 10vh;
  font-family: "Lato", sans-serif;
  border-bottom: 2px white solid;
  margin-left: 30px;
  margin-right: 30px;
  align-items: center;
  position: relative;
`;

const StyledAccount = styled(FaUserCircle)`
  font-size: 80px;
  color: white;
  margin: 20px;
`;
const StyledLogo = styled(FaGuitar)`
  font-size: 80px;
  color: white;
  margin: 20px;
`;

const StyledButton = styled.button`
  z-index: 100;
  background-color: transparent;
  border: none;

  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
export const Title = styled.h1`
  color: white;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 40px;
`;

export default Header;
