import React from "react";
import { FaUserCircle, FaQuestionCircle, FaSortDown } from "react-icons/fa";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import styled, { keyframes } from "styled-components";
import { CloseButton } from "./SignForm";
import { BackButton } from "./Login";
import { FaArrowLeft } from "react-icons/fa";
const SignUp = ({ setShowingForm, showingForm, signUp, setSignUp }) => {
  const [formData, setFormData] = useState({});
  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    fetch("/signUp", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        switch (result.status) {
          case 200:
            setCurrentUser(result.data);
            setShowingForm(!showingForm);
            break;
          case 404:
            setError(result.message);
            break;
        }
      });
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
        {error && <StyledError>{error}</StyledError>}
        <BackButton onClick={() => setSignUp(!signUp)}>
          <FaArrowLeft />
        </BackButton>
        <CloseButton
          onClick={() => {
            setShowingForm(!showingForm);
          }}
        >
          X
        </CloseButton>
        <Warning>Quick! give me your personal info.</Warning>
        <StyledAccount />
        <Input
          type="text"
          placeholder="Username"
          name={"username"}
          required={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          type="text"
          placeholder="First Name"
          name={"fName"}
          required={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name={"lName"}
          required={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          name={"email"}
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
        <Input
          type="password"
          placeholder="Repeat password"
          name={"repeat"}
          required={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Submit type="submit">Sign Up</Submit>
      </StyledForm>
    </Wrapper>
  );
};

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
export const StyledForm = styled.form`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  width: 700px;
  height: 800px;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const Input = styled.input`
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  width: 250px;
  height: 50px;
  z-index: 1;
`;

export const Submit = styled.button`
  background-color: #d1560e;
  border: none;
  width: 100%;
  height: 11%;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  font-weight: 600;
  font-size: 30px;
  position: fixed;
  bottom: 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: rgba(209, 86, 14, 0.8);
    font-size: 31px;
  }
`;
export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
export const StyledAccount = styled(FaUserCircle)`
  font-size: 120px;
  color: white;
  margin: 20px;
`;

export const Warning = styled.p`
  margin: 0;
  font-size: 25px;
  color: rgba(255, 255, 255, 0.8);
`;

const StyledError = styled.p`
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  position: absolute;
  top: 480px;
  color: #d1560e;
  z-index: 100;
`;

export default SignUp;
