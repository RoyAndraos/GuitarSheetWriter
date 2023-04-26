import React, { useState, useContext } from "react";
import { CloseButton } from "./SignForm";
import {
  Wrapper,
  StyledAccount,
  StyledForm,
  Warning,
  Input,
  Submit,
} from "./SignUp";
import { UserContext } from "../Contexts/UserContext";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";

const Login = ({ showingForm, setShowingForm, setLogin, login }) => {
  const [loginForm, setLoginForm] = useState({});
  const { setCurrentUser } = useContext(UserContext);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const handleSubmit = (e, loginForm) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setResponse(result))
      .then(() => {
        switch (response.status) {
          case 200:
            console.log(response.data);
            setCurrentUser(response.data);
            return;
          case 404:
            return setError(response.message);
        }
      });
  };
  const handleChange = (key, value) => {
    setLoginForm({ ...loginForm, [key]: value });
  };
  return (
    <Wrapper>
      <StyledForm onSubmit={(e) => handleSubmit(e, loginForm)}>
        {error && <StyledError>{error}</StyledError>}
        <BackButton
          onClick={() => {
            setLogin(!login);
          }}
        >
          <FaArrowLeft />
        </BackButton>
        <CloseButton
          onClick={() => {
            setShowingForm(!showingForm);
          }}
        >
          X
        </CloseButton>
        <Warning>Enter username and password</Warning>
        <StyledAccount />
        <Input
          type="text"
          placeholder="Username"
          name={"username"}
          required={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          name={"password"}
          required={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Submit type="submit">Sign in</Submit>
      </StyledForm>
    </Wrapper>
  );
};
export const BackButton = styled.button`
  border: none;
  position: absolute;
  left: 15px;
  top: 15px;
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
const StyledError = styled.p`
  position: absolute;
  top: 450px;
  color: #d1560e;
`;

export default Login;
