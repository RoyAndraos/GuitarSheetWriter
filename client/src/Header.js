import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { FaGuitar } from "react-icons/fa";
import { useState, useContext } from "react";
import SignForm from "./SignForm";
import { UserContext } from "./UserContext";
const Header = () => {
  const [showingForm, setShowingForm] = useState(false);
  const { currentUser } = useContext(UserContext);
  const handleAccount = (e) => {
    e.preventDefault();
    setShowingForm(!showingForm);
  };
  return (
    <Wrapper>
      {showingForm && (
        <SignForm setShowingForm={setShowingForm} showingForm={showingForm} />
      )}
      <StyledButton>
        <StyledLogo />
      </StyledButton>
      {currentUser && <Title>Hello {currentUser.username}!</Title>}
      <StyledButton onClick={handleAccount}>
        <StyledAccount />
      </StyledButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  font-family: "Lato", sans-serif;
  border-bottom: 2px white solid;
  margin-left: 30px;
  margin-right: 30px;
  align-items: center;
`;

const StyledAccount = styled(FaUserCircle)`
  font-size: 45px;
  color: white;
  margin: 20px;
`;
const StyledLogo = styled(FaGuitar)`
  font-size: 45px;
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
const Title = styled.h1`
  color: white;
  &:hover {
    cursor: default;
  }
`;
export default Header;
