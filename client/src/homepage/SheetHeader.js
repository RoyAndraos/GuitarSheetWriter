import styled from "styled-components";
import { FaMusic } from "react-icons/fa";
const SheetHeader = ({ formData }) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <BpmWrapper>
          <FaMusic />: {formData.tempo}
        </BpmWrapper>
        <p>TS: {formData.timeSignature}</p>
      </InfoWrapper>
      {formData.title ? (
        <Title>{formData.title}</Title>
      ) : (
        <TitlePlaceHolder>Title</TitlePlaceHolder>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  border-bottom: rgba(0, 0, 0, 0.5) 2px solid;
  margin-right: 25px;
  margin-left: 25px;
  &:hover {
    cursor: default;
  }
`;
const InfoWrapper = styled.div`
  font-size: 10px;
  font-weight: 700;
  opacity: 0.6;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 10vw;
`;

const Title = styled.p`
  position: absolute;
  left: 50%;
  font-size: 25px;
  transform: translateX(-50%);
`;
const BpmWrapper = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;
const TitlePlaceHolder = styled.p`
  position: absolute;
  left: 50%;
  font-size: 25px;
  transform: translateX(-50%);
  opacity: 0.3;
`;
export default SheetHeader;
