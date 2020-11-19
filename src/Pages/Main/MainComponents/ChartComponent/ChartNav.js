import React from "react";
import styled from "styled-components";

const ChartNav = ({ clickBtn, navColor, sortMapper }) => {
  
  return (
    <Container>
      <Hashtags>
        {btns.map((btn, idx) => {
          return (
            <Hashtag
              key={idx}
              id={sortMapper[idx]}
              color={sortMapper[idx] === navColor}
              onClick={clickBtn}
            >
              {btn}
            </Hashtag>
          );
        })}
      </Hashtags>
      <div>
        <CoinSearch />
        <TradingValue>24시간 거래량(원)<span>69,651백만</span></TradingValue>
        
      </div>
    </Container>
  );
};

export default ChartNav;

const Container = styled.div`
  width: 1024px;
  height: 36px;
  margin: 100px auto 24px;
  display: flex;
  align-content: center;
  justify-content: space-between;

  > div {
    display: flex;
  }
`;

const Hashtags = styled.div`
  height: 32px;
  align-items: center;
`;

const Hashtag = styled.button`
  height: 24px;
  margin-left: 5px;
  color: ${({ color }) => (color ? "black" : "#c9ccd2")};
  font-size: 18px;
  font-weight: bold;
  :hover {
    color: black;
    cursor: pointer;
    transition-timing-function: linear;
    transition-duration: 0.2s;
  }
`;

const CoinSearch = styled.input.attrs({
  type: "text",
  placeholder: "코인 검색",
})`
  width: 240px;
  height: 32px;
  background-color: #f5f5f5;
  border-radius: 6px;
  border: 1px solid #f8f8f9;
  padding-left: 20px;
  font-size: 14px;
  font-weight: bold;
  ::placeholder {
    color: #a9a9a9;
  }
`;

const TradingValue = styled.div`
  width: 200px;
  height: 30px;
  margin: 2px 0 2px 20px;
  font-size: 10px;
  line-height: 30px;
  color: #a9a9a9;
  > span {
    margin-left: 23px;
    font-size: 15px;
    font-weight: 500;
    color:#79818f;
  }
`;

const btns = ["#거래량많은", "#급등하는", "#급락하는", "#최근상장"];
