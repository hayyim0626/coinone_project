import React from "react";
import styled from "styled-components";
import tipData from "./MockData/tipData";

const Tips = () => {
  return (
    <Body>
      <Text>코인원을 100% 활용하는</Text>
      <Text tip>추가 수익 TIP 3</Text>
      <Boxes>
        {tipData.map((data, idx) => {
          return (
            <Box key={idx}>
              <ImgBox>
                <img alt={data.alt} src={data.img} />
              </ImgBox>
              <TextBox>
                <Title>{data.title}</Title>
                <Content>{data.contents}</Content>
                <Content>{data.content}</Content>
                <HashTag>{data.hashtag}</HashTag>
              </TextBox>
            </Box>
          );
        })}
      </Boxes>
    </Body>
  );
};

export default Tips;

const Body = styled.div`
  width: 1024px;
  height: 400px;
  margin: 0 auto;
`;

const Text = styled.div`
  font-size: ${(props) => (props.tip ? "18px" : "13px")};
  font-weight: ${(props) => (props.tip ? "600" : "400")};
  margin-bottom: 8px;
`;

const Boxes = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Box = styled.div`
  width: 330px;
  height: 290px;
  border: 1px solid #e4e5e8;
  border-radius: 3px;
  margin: 6px 12px;
  :hover {
    margin-top: 2px;
    transition-timing-function: linear;
    transition-duration: 0.2s;
    box-shadow: 0 3px 10px -3px #e4e5e8;
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 3px;
  overflow: hidden;
`;

const TextBox = styled.div`
  padding: 25px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #aeb3bb;
  margin-bottom: 10px;
  > span {
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const HashTag = styled.div`
  margin-top: 15px;
  font-size: 12px;
  font-weight: 600;
  color: #1772f8;
`;
