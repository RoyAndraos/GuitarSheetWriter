import React from "react";
import { FaUserCircle, FaQuestionCircle, FaSortDown } from "react-icons/fa";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import styled, { keyframes } from "styled-components";
import { CloseButton } from "./SignForm";
import { BackButton } from "./Login";
import { FaArrowLeft } from "react-icons/fa";
const SignUp = ({ setShowingForm, showingForm, signUp, setSignUp }) => {
  const [signUpDone, setSignUpDone] = useState(false);
  const [security, setSecurity] = useState("");
  const [dorpDown, setDropDown] = useState(false);
  const [formData, setFormData] = useState({});
  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleSecurityChange = (key, value) => {
    setSecurity({ ...security, [key]: value });
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
            setSignUpDone(!signUpDone);
            setCurrentUser(result.data);
            break;
          case 404:
            console.log(result.message);
            setError(result.message);
            break;
        }
      });
  };

  const handleAddSecuritySubmit = (e, formData, security) => {
    const patchData = { formData: formData, security: security };
    console.log(patchData);
    e.preventDefault();
    fetch("/addSecurity", {
      method: "PATCH",
      body: JSON.stringify(patchData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <Wrapper>
      {signUpDone ? (
        <StyledForm
          onSubmit={(e) => {
            handleAddSecuritySubmit(e, formData, security);
          }}
        >
          <NoThanks
            onClick={() => {
              setShowingForm(!showingForm);
            }}
          >
            No Thanks
          </NoThanks>
          <Warning>Add a security question. Just in case! (optional)</Warning>
          <StyledQuestion />
          <StyledSelect
            type="text"
            onClick={(e) => {
              e.preventDefault();
              setDropDown(!dorpDown);
            }}
          >
            Select a question, or type in your own below
            <StyledArrow />
            <SecondStyledArrow />
          </StyledSelect>
          {dorpDown && (
            <DorpDownComponent>
              <Option
                name={"question"}
                onClick={(e) => {
                  console.log();
                  handleSecurityChange(
                    "question",
                    Object.entries(e.target)[0][1].memoizedProps.children
                  );
                }}
              >
                What is your favorite movie or book?
              </Option>
              <Option
                name={"question"}
                onClick={(e) =>
                  handleSecurityChange(
                    "question",
                    Object.entries(e.target)[0][1].memoizedProps.children
                  )
                }
              >
                What city were you born in?
              </Option>
              <Option
                name={"question"}
                onClick={(e) => {
                  handleSecurityChange(
                    "question",
                    Object.entries(e.target)[0][1].memoizedProps.children
                  );
                }}
              >
                What is your favorite color?
              </Option>
              <Option
                name={"question"}
                onClick={(e) => {
                  console.log(e);
                  handleSecurityChange(
                    "question",
                    Object.entries(e.target)[0][1].memoizedProps.children
                  );
                }}
              >
                What is the name of your first pet?
              </Option>
              <Option
                name={"question"}
                onClick={(e) =>
                  handleSecurityChange(
                    "question",
                    Object.entries(e.target)[0][1].memoizedProps.children
                  )
                }
              >
                What is your mother's maiden name?
              </Option>
            </DorpDownComponent>
          )}

          <DiffInput
            type="text"
            placeholder="Question"
            name={"question"}
            defaultValue={""}
            onChange={(e) =>
              handleSecurityChange(e.target.name, e.target.value)
            }
            value={security.question}
          />
          <DiffInput
            type="text"
            placeholder="Answer"
            name={"answer"}
            defaultValue={""}
            required={true}
            onChange={(e) =>
              handleSecurityChange(e.target.name, e.target.value)
            }
          />
          <Submit type="submit">Submit</Submit>
        </StyledForm>
      ) : (
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
      )}
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
  width: 500px;
  height: 600px;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const Input = styled.input`
  text-align: center;
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
  z-index: 1;
`;

const DiffInput = styled.input`
  text-align: center;
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
  z-index: 1;
`;

export const Submit = styled.button`
  background-color: #d1560e;
  border: none;
  margin-top: 5px;
  width: 100%;
  height: 10%;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  font-weight: 600;
  font-size: 25px;
  position: fixed;
  bottom: 0;
  &:hover {
    cursor: pointer;
  }
`;
export const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
export const StyledAccount = styled(FaUserCircle)`
  font-size: 80px;
  color: white;
  margin: 20px;
`;

const StyledQuestion = styled(FaQuestionCircle)`
  font-size: 80px;
  color: white;
  margin: 20px;
`;

export const Warning = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
`;
const StyledSelect = styled.button`
  position: relative;
  width: 205.5px;
  height: 50px;
  margin: 0 0 10px 0;
  padding: 0 0 20px 0;
  border-radius: 2px;
  background-color: white;
  color: black;
  border: none;
  outline: none;
  font-size: 12px;
  padding: 8px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: grey;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const StyledArrow = styled(FaSortDown)`
  font-size: 20px;
  position: absolute;
  opacity: 0.9;
  color: grey;
  top: 18px;
  left: 50px;
`;
const SecondStyledArrow = styled(FaSortDown)`
  font-size: 20px;
  position: absolute;
  opacity: 0.9;
  color: grey;
  top: 18px;
  left: 140px;
`;

const DorpDownComponent = styled.div`
  background-color: white;
  text-align: center;
  font-size: 11px;
  margin-bottom: 10px;
  margin-top: -10px;
  list-style-type: none;
  width: 205px;
  transition: all 0.2s ease-in-out;
`;
const Option = styled.div`
  z-index: 10;
  margin: 0;
  height: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: grey;
    color: rgba(255, 255, 255, 0.8);
  }
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

const NoThanks = styled.button`
  border: none;
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 17px;
  font-weight: 900;
  color: grey;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  border-bottom: 2px solid grey;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    color: rgba(255, 255, 255, 0.8);
    border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default SignUp;
