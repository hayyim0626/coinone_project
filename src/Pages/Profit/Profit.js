import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import { wallstreetApi } from '../../Config';

const barMenu = [
  '코인명',
  '보유수량',
  '매수 평균가',
  '매수 금액',
  '평가 금액',
  '수익률',
];

const Profit = () => {
  const [tradingData, setTradingData] = useState({
    coin_list: [
      {
        icon: '',
        coin_name: '',
        coin_code: '',
        quantity: 0,
        average_buying_price: 0,
        buying_price: 0,
        current_price: 0,
        profit_rate: 0,
      },
    ],
    total_asset: 0,
    won_balance: 0,
    coin_balance: 0,
    total_buy_price: 0,
    profit: 0,
    profit_rate: 0,
  });

  const {
    coin_list,
    total_asset,
    won_balance,
    coin_balance,
    total_buy_price,
    profit,
    profit_rate,
  } = tradingData;

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const res = await fetch(`${wallstreetApi}/accounts/assets`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const tradeData = await res.json();
    setTradingData(tradeData);
  };

  return (
    <>
      <Nav />
      <ProfitWrap>
        <MenuVertical>
          <ul>
            <li>수익현황</li>
            <li>입출금</li>
            <li>이용내역</li>
          </ul>
        </MenuVertical>
        <ProfitStatusContainer>
          <span>수익현황</span>
          <TotalAssetContainer>
            <TotalAsset>
              <span>총 보유자산</span>
              <span>{total_asset.toLocaleString()}원</span>
            </TotalAsset>
            <OwnAsset>
              <ItemAndPrice>
                <span>보유 원화</span>
                <span>{won_balance.toLocaleString()}원</span>
              </ItemAndPrice>
              <ItemAndPrice>
                <span>보유 암호화폐</span>
                <span>{coin_balance.toLocaleString()}원</span>
              </ItemAndPrice>
            </OwnAsset>
            <TradingAsset>
              <ItemAndPrice>
                <span>총매수금액</span>
                <span>{total_buy_price.toLocaleString()}원</span>
              </ItemAndPrice>
              <ItemAndPrice>
                <span>평가 손익</span>
                <span>{profit}원</span>
              </ItemAndPrice>
              <ItemAndPrice>
                <span>수익률</span>
                <span>{profit_rate}%</span>
              </ItemAndPrice>
            </TradingAsset>
          </TotalAssetContainer>
          <AssetByOrderContainer>
            <p>
              매수평균가, 평가금액, 평가손익, 수익률은 모두 KRW로 환산한 추정
              값으로 참고용입니다
            </p>
            <AssetByOrder>
              <AssetByOrderBar>
                {barMenu.map((menu, menuIdx) => (
                  <div key={menuIdx}>
                    <span>{menu}</span>
                  </div>
                ))}
              </AssetByOrderBar>
              <AssetByOrderList>
                {coin_list.map((trade, tradeIdx) => {
                  return (
                    <ul key={tradeIdx}>
                      <li>
                        <div>
                          <img alt="coinImg" src={trade.icon} />
                          {trade.coin_code}
                        </div>
                        <span>{trade.coin_name}</span>
                      </li>
                      <li>{trade.quantity}</li>
                      <li>
                        {Math.floor(
                          Number(trade.average_buying_price.price__avg)
                        ).toLocaleString()}
                        원
                      </li>
                      <li>{Number(trade.buying_price).toLocaleString()}원</li>
                      <li>{Number(trade.current_price).toLocaleString()}원</li>
                      <li>{Number(trade.profit_rate)}%</li>
                    </ul>
                  );
                })}
              </AssetByOrderList>
            </AssetByOrder>
          </AssetByOrderContainer>
        </ProfitStatusContainer>
      </ProfitWrap>
      <Footer />
    </>
  );
};

export default Profit;

const ProfitWrap = styled.div`
  margin-top: 50px;
  padding: 80px 0;
  height: 800px;
  ${({ theme }) => theme.flex('center', 'center')};
`;

const MenuVertical = styled.div`
  width: 15%;
  height: 100%;
  border-right: 1px solid #c9ccd2;
  li {
    :first-child {
      ${({ theme }) => theme.text('20px', '700', '#1772f8')};
    }
    margin-bottom: 40px;
    ${({ theme }) => theme.text('20px', '700', '#c9ccd2')};
  }
`;

const ProfitStatusContainer = styled.div`
  width: 70%;
  height: 100%;
  padding-left: 5%;
  & > span {
    ${({ theme }) => theme.text('40px', '700')};
  }
`;

const TotalAssetContainer = styled.div`
  width: 100%;
  height: 130px;
  margin: 50px 0;
  border-top: 1px solid #c9ccd2;
  border-bottom: 1px solid #c9ccd2;
  ${({ theme }) => theme.flex('center', 'center')};
`;

const TotalAsset = styled.div`
  width: 33%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  span {
    :first-child {
      font-size: 14px;
      margin-bottom: 10px;
    }
    :last-child {
      ${({ theme }) => theme.text('34px', '500')}
    }
  }
`;

const ItemAndPrice = styled.div`
  width: 100%;
  padding: 0 30px;
  ${({ theme }) => theme.flex('space-between', 'center')};
  span {
    margin: 10px 0;
  }
`;

const OwnAsset = styled.div`
  width: 34%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center', 'column')}
`;

const TradingAsset = styled.div`
  width: 33%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  span {
    color: #79818f;
  }
`;

const AssetByOrderContainer = styled.div`
  width: 100%;
  & > p {
    ${({ theme }) => theme.text('12px', 400, '#79818f')}
  }
`;

const AssetByOrder = styled.div`
  margin-top: 20px;
`;

const AssetByOrderBar = styled.div`
  width: 100%;
  height: 40px;
  border-top: 1px solid #c9ccd2;
  border-bottom: 1px solid #c9ccd2;
  background-color: #f8f8f9;
  ${({ theme }) => theme.flex('center', 'center')}
  div {
    :first-child {
      width: 25%;
    }
    width: 15%;
    span {
      padding-left: 10px;
      font-size: 14px;
    }
  }
`;

const AssetByOrderList = styled.div`
  width: 100%;
  ul {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #c9ccd2;
    ${({ theme }) => theme.flex('center', 'center')};
    li {
      width: 15%;
      padding-left: 10px;
      font-size: 14px;
      :first-child {
        width: 25%;
        div {
          ${({ theme }) => theme.flex(null, 'center')};
          img {
            margin: 5px;
            width: 20px;
          }
        }
        span {
          margin-left: 5px;
          ${({ theme }) => theme.text('5px', null, '#79818f')}
        }
      }
    }
  }
`;
