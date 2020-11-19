import React from "react";
import InfoLeft from "./InfoComponent/InfoLeft";
import InfoRight from "./InfoComponent/InfoRight";
import styled from "styled-components";

const Informations = () => {
  return (
    <Info>
      <InfoLeft></InfoLeft>
      <InfoRight></InfoRight>
    </Info>
  );
};

export default Informations;

const Info = styled.div`
  width: 1024px;
  height: 1020px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const Head = styled.div`
  width: 100%;
  height: 27px;
  display: flex;
  justify-content: space-between;
  border-bottom: ${(props) => (props.info ? "1px solid #e4e5e8" : "")};
  padding: 0 3px;
`;

export const Header = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #18191c;
  line-height: 23px;
`;

export const ViewAll = styled.a`
  font-size: 12px;
  line-height: 27px;
  color: #18191c;
  :hover {
    cursor: pointer;
  }
`;

// :after {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height: 1px;
//   background-color: #e4e5e8;
// }
