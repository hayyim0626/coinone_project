import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import StockChart from "./StockChart";

function MainChart({ chartList }) {
  const [coinId, setCoinid] = useState(0);

  const [listData, setListData] = useState([]);
  
  useEffect(() => {
    setListData(chartList);
    setGraph(0);
  }, [chartList]);

  const setGraph = (idx) => {
    setCoinid(idx)
  }

  return (
    <MainPageChart>
      <ChartBox chart>
        <Graph>
          <StockChart
            chartList={chartList}
            coinId={coinId}
          />
        </Graph>
        <GoExchange><Link to="/exchange">거래소 바로가기</Link></GoExchange>
      </ChartBox>
      <ChartBox list>
        <ChartTitle>
          <ListTitle allDay>최근 24시간 기준</ListTitle>
          <ListTitle>현재가</ListTitle>
          <ListTitle>등락률</ListTitle>
          <ListTitle>거래대금</ListTitle>
        </ChartTitle>
        <EntireChart>
          {listData.map((chart, idx) => {
            return (
              <ChartList
                key={idx}
                id={chart?.id}
                onClick={() => setGraph(idx)}
              >
                <Text name>{chart?.coinName}</Text>
                <Text 
                  color={
                    chart?.upDown.toFixed(2) === 0 || -0
                      ? "black"
                      : chart?.upDown.toFixed(2) > 0
                      ? "#e12343"
                      : chart?.upDown.toFixed(2) < 0
                      ? "#1763b6"
                      : "black"
                  }
                >
                  {chart?.present}
                </Text>
                <Text 
                  color={
                    chart?.upDown.toFixed(2) === 0 || -0
                      ? "black"
                      : chart?.upDown.toFixed(2) > 0
                      ? "#e12343"
                      : chart?.upDown.toFixed(2) < 0
                      ? "#1763b6"
                      : "black"
                  }
                >
                  {chart?.upDown.toFixed(2)}%
                </Text>
                <Text dollar>{chart?.volume}만</Text>
                <button>⇆</button>
              </ChartList>
            );
          })}
        </EntireChart>
        <MoreCoin>
          <Link to="/exchange">코인 더 보러가기 &gt;</Link>
        </MoreCoin>
      </ChartBox>
    </MainPageChart>
  );
}

export default MainChart;

const MainPageChart = styled.div`
  width: 100%;
  height: 530px;
  border-top: solid 1px #e4e5e8;
  border-bottom: solid 2px #e4e5e8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartBox = styled.div`
  width: 496px;
  height: 432px;
  border: 1px solid #e4e5e8;
  border-radius: 2px;
  box-shadow: 0 3px 10px -3px #e4e5e8;
  padding: 14px 7px;
  margin-right: 18px;
  ${({ chart }) => chart && hover}
`;

const EntireChart = styled.div`
  height: 330px;
  overflow-y: scroll;
`;

const Graph = styled.div`
  width: 462px;
  height: 350px;
  margin-left: 8px;
`;

const GoExchange = styled.button`
  width: 432px;
  height: 48px;
  background-color: #f5f5f5;
  border-radius: 3px;
  line-height: 48px;
  font-weight: bold;
  color: #999999;
  margin-left: 15px;
  cursor: pointer;
`;

const ChartTitle = styled.div`
  width: 480px;
  height: 35px;
  line-height: 40px;
  display: flex;
  padding: 0 42px 0 5px;
  font-size: 12px;
  color: #a9a9a9;
`;

const ListTitle = styled.span`
  width: ${({ allDay }) => (allDay ? "25%" : "24%")};
  height: 30px;
  padding-right: ${({ allDay, dollar }) => (allDay ? "" : "5px")};
  font-size: 12px;
  color: #a9a9a9;
  line-height: 30px;
  text-align: ${({ allDay }) => (allDay ? "left" : "right")};
`;

const ChartList = styled.button`
  width: 100%;
  height: 65px;
  display: flex;
  line-height: 65px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
  :hover {
    background-color: #f0f0f0;
  }
  > button {
    width: 40px;
    height: 63px;
    color: #a9a9a9;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    :hover {
      color: black;
    }
  }
`;

const Text = styled.span`
  width: 25%;
  text-align: ${({ name }) => (name ? "left" : "right")};
  font-weight: ${({ name }) => (name ? "600" : "400")};
  color: ${({ color }) => color};
`;

const MoreCoin = styled.button`
  width: 463px;
  height: 20px;
  margin-top: 15px;
  color: #999999;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  :hover {
    color: black;
  }
`;

const hover = css`
  :hover {
    margin-bottom: 8px;
    transition-timing-function: linear;
    transition-duration: 0.2s;
    cursor: pointer;
    > button {
      color: white;
      background-color: #0058ff;
    }
  }
`;
