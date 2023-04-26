import styled from "styled-components";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
const SheetFooter = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Wrapper>
      {currentUser && <Author>by: {currentUser.username}</Author>}
      <Page>p.1/1</Page>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: rgba(0, 0, 0, 0.5) 2px solid;
  margin: 50px 25px 0 25px;
  position: relative;
  bottom: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Page = styled.p`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
  position: relative;
  font-style: italic;
  width: fit-content;
`;
const Author = styled.div`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
  position: relative;
  font-style: italic;
  left: 0;
  width: fit-content;
`;

export default SheetFooter;
