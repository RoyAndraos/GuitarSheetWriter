import { useState } from "react";
import styled from "styled-components";
import { fadeIn } from "./SignUp";
import Login from "./Login";
import SignUp from "./SignUp";
const SignForm = ({ setShowingForm, showingForm }) => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <Wrapper>
      {!login && !signUp && (
        <Container>
          <StyledButton onClick={() => setLogin(!login)}>Sign In</StyledButton>
          <CloseButton
            onClick={() => {
              setShowingForm(!showingForm);
            }}
          >
            X
          </CloseButton>
          <StyledButton onClick={() => setSignUp(!signUp)}>
            Sign Up
          </StyledButton>
        </Container>
      )}
      {login && (
        <Login
          setShowingForm={setShowingForm}
          showingForm={setShowingForm}
          setLogin={setLogin}
          login={login}
        />
      )}
      {signUp && (
        <SignUp
          setShowingForm={setShowingForm}
          showingForm={showingForm}
          setSignUp={setSignUp}
          signUp={signUp}
        />
      )}
    </Wrapper>
  );
};
export const CloseButton = styled.button`
  border: none;
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 30px;
  font-weight: 900;
  color: grey;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    color: rgba(255, 255, 255, 0.8);
  }
  &:active {
    transform: scale(0.95);
  }
`;
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
const StyledButton = styled.button`
  border: none;
  width: 200px;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  color: grey;
  text-decoration: underline;
  line-height: 100px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #d1560e;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    cursor: pointer;
  }
  &:first-of-type {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  &:last-of-type {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;
export default SignForm;
