import React from "react";
import styled from "styled-components";
import infoData from "../MockData/infoData";
import { Head, Header, ViewAll } from "../Informations";

const InfoRight = () => {
  return (
    <Right>
      <Box>
        <Head card>
          <Header>월스트리트 소식</Header>
          <ViewAll>전체보기</ViewAll>
        </Head>
        <Card>
          <span>
            <New>New Event</New>
            <Title>월스트리트 VIP 프로그램 가입 안내</Title>
          </span>
          <div>
            <Img />
          </div>
          <Btn>더 알아보기</Btn>
        </Card>
      </Box>
      <Box>
        <Head card>
          <Header>리워드</Header>
        </Head>
        <Card reward>
          <span>
            <New reward>WeCode</New>
          </span>
          <div>
            <Img />
          </div>
          <Btn reward>위코드 첫 데일리 리워드 지급</Btn>
        </Card>
      </Box>
      <Box>
        <Head card>
          <Header>자주하는 질문</Header>
          <ViewAll>전체보기</ViewAll>
        </Head>
        <div>
          {infoData.qna.map((data, idx) => {
            return (
              <QnA key={idx}>
                <Text>{data.question}</Text>
                <Text>{data.point}</Text>
              </QnA>
            );
          })}
        </div>
      </Box>
    </Right>
  );
};

export default InfoRight;

const Right = styled.div`
  width: 420px;
`;

const Box = styled.div``;

const Card = styled.div`
  width: 100%;
  height: ${(props) => (props.reward ? "300px" : "360px")};
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  justify-content: center;
  margin-bottom: 20px;
  > div {
    width: 300px;
    height: 140px;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 auto 20px;
  }
`;

const New = styled.div`
  color: ${(props) => (props.reward ? "black" : "#aeb3bb")};
  font-weight: 700;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Img = styled.img.attrs({
  src:
    "https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
})``;

const Btn = styled.button`
  color: #0058ff;
  width: ${(props) => (props.reward ? "360px" : "300px")};
  height: 50px;
  border: 1px solid #0058ff;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 600;
  display: block;
  margin: 0 auto;
  :hover {
    background-color: #1772f8;
    color: white;
    cursor: pointer;
    transition-timing-function: linear;
    transition-duration: 0.2s;
  }
`;

const QnA = styled.button`
  width: 420px;
  height: 60px;
  border: 1px solid #abb3bb;
  border-radius: 2px;
  margin-bottom: 10px;
  :hover {
    border: 2px solid #abb3bb;
    transition-timing-function: linear;
    transition-duration: 0.1s;
    cursor: pointer;
  }
`;

const Text = styled.span`
  color: #18191c;
  font-size: 15px;
  font-weight: 600;
`;

