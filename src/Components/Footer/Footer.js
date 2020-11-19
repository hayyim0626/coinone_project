import React from 'react';
import styled from 'styled-components';
import FooterContents from './FooterContents';

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContainer>
        <LeftSection>
          <LeftVerticalPart>
            <div>
              <CustomerSeriveCenter>고객센터&nbsp;</CustomerSeriveCenter>
              <span>10:00~19:00 (주말 및 공휴일 제외)</span>
            </div>
            <div>
              {FooterContents.counseling.map((text, textIdx) => (
                <CounselingText key={textIdx}>{text}</CounselingText>
              ))}
            </div>
            <span>전화문의 1670-9756</span>
          </LeftVerticalPart>
          <LeftVerticalPart>
            <ul>
              {FooterContents.address.map((text, textIdx) => (
                <li key={textIdx}>{text}</li>
              ))}
            </ul>
          </LeftVerticalPart>
          <LeftVerticalPart>
            <span>상장 및 제휴 문의</span>
          </LeftVerticalPart>
        </LeftSection>
        <RightSection>
          <RightHorizonalPart>
            {FooterContents.company.map((text, textIdx) => (
              <li key={textIdx}>{text}</li>
            ))}
          </RightHorizonalPart>
          <RightHorizonalPart>
            {FooterContents.guide.map((text, textIdx) => (
              <li key={textIdx}>{text}</li>
            ))}
          </RightHorizonalPart>
          <RightHorizonalPart>
            {FooterContents.policy.map((text, textIdx) => (
              <li key={textIdx}>{text}</li>
            ))}
          </RightHorizonalPart>
        </RightSection>
      </FooterContainer>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
  position: relative;
  bottom: 0;
  width: 100%;
  height: 350px;
  background-color: rgb(243, 243, 243);
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  ${({ theme }) => theme.flex('center', null)};
`;

const LeftSection = styled.div`
  width: 50%;
`;

const RightSection = styled.div`
  width: 50%;
  ${({ theme }) => theme.flex('center', null)};
`;

const LeftVerticalPart = styled.div`
  ${({ theme }) => theme.text('12px', null, 'rgb(190, 190, 190)')};
  width: 100%;
  margin-bottom: 40px;
  div {
    margin-bottom: 15px;
  }
  ul {
    li {
      margin-bottom: 10px;
    }
  }
`;

const CustomerSeriveCenter = styled.span`
  ${({ theme }) => theme.text('14px', '600', 'black')};
`;

const CounselingText = styled.span`
  color: rgb(100, 100, 100);
  font-weight: 600;
`;

const RightHorizonalPart = styled.ul`
  width: 33%;
  color: rgb(190, 190, 190);
  font-size: 14px;
  li {
    :first-child {
      color: black;
      font-weight: 500;
    }
    margin-bottom: 10px;
  }
`;
