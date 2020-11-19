import React from "react";
import styled from "styled-components";

const Etc = () => {
  return (
    <div>
      <App>
        <Box>
          <Text title>거래를 위한 모든 기능이 한 손에</Text>
          <Text>더 새로워진 월스트리트 모바일 앱</Text>
          <Img>
            <Google />
            <AppStore />
          </Img>
        </Box>
      </App>
      <Introduce>
        <Service>
          <div>
            <Title service>서비스 소개</Title>
            <Text title={"14px"}>올바른 상장 심사</Text>
            <Text>
              8가지 상장 심사 기준을 통해 <br /> 프로젝트의 지속가능성과
              투명성을 검증합니다.
            </Text>
          </div>
          <div>
            <Check></Check>
          </div>
        </Service>
      </Introduce>
      <EngineAd>
        <div>
          <Title>최적의 트레이닝 엔진, 월스트리트 코어</Title>
          <EngineText>
            편리한 인터페이스와 고성능 체결 엔진이 정확한 트레이딩을 돕습니다.
          </EngineText>
          <Btn>바로가기</Btn>
        </div>
      </EngineAd>
    </div>
  );
};

export default Etc;

const App = styled.div`
  width: 100%;
  height: 500px;
  background: url("/images/phone.jpg") no-repeat;
  background-size: cover;
  background-position: center center;
`;

const Box = styled.div`
  width: 1170px;
  height: 500px;
  margin: 0 auto;
  ${({ theme }) => theme.flex("center", "", "column")}
`;

const Text = styled.div`
  ${({ theme, title }) =>
    theme.text(
      `${title ? "27px" : "15px"}`,
      `${title ? "600" : "400"}`,
      `${title ? "#18191c" : "#79818f"}`
    )}
  margin-bottom: 20px;
`;

const Img = styled.button`
  width: 170px;
  margin-top: 20px;
  display: flex;
  cursor: pointer;
`;

const Google = styled.img.attrs({
  src: "images/googleplay.png",
})`
  margin-right: 20px; ;
`;

const AppStore = styled.img.attrs({
  src: "images/appstore.png",
})``;

const Check = styled.img.attrs({
  src: "images/testing.jpg",
})`
  width: 350px;
`;

const Introduce = styled.div`
  width: 100%;
  height: 440px;
  ${({ theme }) => theme.flex("center", "", "column")}
`;

const Service = styled.div`
  width: 1170px;
  height: 300px;
  margin: 0 auto;
  ${({ theme }) => theme.flex("space-between", "center", "")}
`;

const EngineAd = styled.div`
  width: 100%;
  height: 200px;
  background: url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60")
    no-repeat;
  background-size: cover;
  background-position: center center;
  text-align: center;
  > div {
    width: 600px;
    height: 200px;
    margin: 0 auto;
    ${({ theme }) => theme.flex("center", "center", "column")}
  }
`;

const Title = styled.div`
  ${({ theme, service }) =>
    theme.text(
      `${service ? "18px" : "30px"}`,
      `${service ? "600" : "600"}`,
      `${service ? "#79818f" : "white"}`
    )}
  margin-bottom: 20px;
`;

const EngineText = styled.div`
  ${({ theme }) => theme.text("15px", "600", "white")}
  margin-bottom: 30px;
`;

const Btn = styled.button`
  width: 160px;
  height: 48px;
  border: 1px solid white;
  border-radius: 3px;
  ${({ theme }) => theme.text("400", "600", "white")}
  cursor: pointer;
`;
