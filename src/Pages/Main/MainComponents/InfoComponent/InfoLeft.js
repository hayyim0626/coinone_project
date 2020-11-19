import React from "react";
import styled from "styled-components";
import infoData from "../MockData/infoData";
import {Head, Header, ViewAll} from "../Informations"

const InfoLeft = () => {
  return (
    <Left>
      <News>
        <Head>
          <Header>월스트리트 뉴스</Header>
          <ViewAll>전체보기</ViewAll>
        </Head>
        <Card news>
          <span>
            <Briefing>시황브리핑</Briefing>
            <Title>
              월스트리트 증시, <br /> 세계 최초 바이트코인 WOW 상장
            </Title>
            <Btn>자세히보기</Btn>
          </span>
          <div>
            <Img />
          </div>
        </Card>
      </News>
      <Box>
        <Head info>
          <Header>공지사항</Header>
          <ViewAll>전체보기</ViewAll>
        </Head>
        <ul>
          {infoData.notice.map((data, idx) => {
            return (
              <Contents key={idx}>
                <span>
                  <Title>{data.title}</Title>
                  <Content>{data.contents}</Content>
                </span>
                <Date>{data.date}</Date>
              </Contents>
            );
          })}
        </ul>
      </Box>
      <Box>
        <Head info>
          <Header>프로젝트 정보</Header>
          <ViewAll>전체보기</ViewAll>
        </Head>
        <ul>
          {infoData.project.map((data, idx) => {
            return (
              <Contents info key={idx}>
                <Corporation>
                  <Title coin>{data.coin} </Title>
                  <Content company>{data.company}</Content>
                </Corporation>
                <div>
                  <Title>{data.title}</Title>
                  <PjContent>{data.contents}</PjContent>
                </div>
                <Date>{data.date}</Date>
              </Contents>
            );
          })}
        </ul>
      </Box>
    </Left>
  );
};

export default InfoLeft;

const Left = styled.div`
  width: 525px;
`;

const News = styled.div`
  margin-bottom: 20px;
`;

const Card = styled.div`
  width: 525px;
  height: 166px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
  > div {
    width: 200px;
    height: 130px;
    border-radius: 2px;
    overflow: hidden;
  }
`;

const Briefing = styled.div`
  margin-bottom: 5px;
  color: #a9a9a9;
  font-size: 12px;
  font-weight: 600;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: ${(props) => (props.coin ? "600" : "400")};
`;

const Btn = styled.button`
  color: #0058ff;
  border: 1px solid #0058ff;
  border-radius: 3px;
  :hover{
    background-color: #1772f8;
    color: white;
    cursor: pointer;
    transition-timing-function: linear;
    transition-duration: 0.2s;
  }
`;

const Img = styled.img.attrs({
  src:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
})``;

const Box = styled.div`
  margin-bottom: 20px;
  >ul {
    height: ${(props) => (props.info ? "400" : "300")};
  }
`;

const Corporation = styled.span`
  width: 70px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  width: 400px;
  font-size: 12px;
  font-weight: ${(props) => (props.company ? "600" : "400")};
  line-height: 16px;
  color: #a9a9a9;
`;

const PjContent = styled(Content)`
  width: 350px;
`;

const Contents = styled.li`
  width: 525px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  :hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const Date = styled.div`
  font-size: 12px;
  color: #abb3bb;
`;
