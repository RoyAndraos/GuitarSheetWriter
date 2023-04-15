import styled from "styled-components";
import { FaCircle } from "react-icons/fa";
import { FaSquare } from "react-icons/fa";
const ControlPanel = ({ start, stop, started }) => {
  return (
    <Wrapper>
      <StyledButton onClick={start} disabled={started}>
        <StyledCircle />
      </StyledButton>
      <StyledButton onClick={stop} disabled={!started}>
        <StyledSquare />
      </StyledButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledButton = styled.button`
  font-size: 20px;
  appearance: none;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const StyledSquare = styled(FaSquare)`
  color: black;
`;
const StyledCircle = styled(FaCircle)`
  color: red;
  outline: none;
`;
export default ControlPanel;
