import styled from "styled-components";
const SheetFooter = () => {
  return (
    <Wrapper>
      <Page>p.1/1</Page>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: rgba(0, 0, 0, 0.5) 2px solid;
  margin: 50px 25px 0 25px;
  position: relative;
  bottom: 0;
`;
const Page = styled.p`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
  position: relative;
  font-style: italic;
  left: 90%;
  width: fit-content;
`;

export default SheetFooter;
