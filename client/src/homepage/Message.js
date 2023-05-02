import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FetchMessageContext } from "../Contexts/FetchMessageContext";

const Message = () => {
  const { fetchMessage, setFetchMessage } = useContext(FetchMessageContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (fetchMessage !== "") {
      setVisible(true);
      const timeout = setTimeout(() => {
        setFetchMessage("");
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [fetchMessage]);

  return (
    <Wrapper key={fetchMessage} visible={visible}>
      {fetchMessage}
    </Wrapper>
  );
};

const fadeOut = keyframes`
  0% {
    opacity: 1;
    background-color: rgba(200, 200, 200, 0.8);
  }

  100% {
    opacity: 0;
    background-color: rgba(200, 200, 200, 0);
  }
`;

const Wrapper = styled.div`
  padding-top: 50px;
  text-align: center;
  padding-bottom: 50px;
  border-radius: 20px;
  font-size: 25px;
  margin-top: 50px;
  color: rgb(30, 30, 30);
  animation: ${({ visible }) => (visible ? fadeOut : "none")} 3.5s ease-in;
`;

export default Message;
