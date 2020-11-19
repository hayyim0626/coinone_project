import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { textDisassemble, numberToKorean } from './utility';

const CoinList = ({
  res,
  mockRes,
  selectedCoin,
  selectCoinOfList,
  selectedFakeCoin,
  selectFakeCoin,
}) => {
  const [listDatas, setListDatas] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [mockDatas, setMockDatas] = useState([]);
  const [initialMockDatas, setInitialMockDatas] = useState([]);

  useEffect(() => {
    setListDatas(res);
    setInitialData(res);
    setMockDatas(mockRes);
    setInitialMockDatas(mockRes);
  }, [res]);

  useEffect(() => {
    let searchResult = initialData.filter((coin) => {
      let coinNameinitial = textDisassemble(coin.full_name);
      const { full_name, abbreviation_name } = coin;
      return (
        coinNameinitial.includes(inputValue) ||
        full_name.includes(inputValue) ||
        abbreviation_name.includes(inputValue.toUpperCase())
      );
    });
    let searchFakeResult = initialMockDatas.filter((coin) => {
      let coinNameinitial = textDisassemble(coin.full_name);
      const { full_name, abbreviation_name } = coin;
      return (
        coinNameinitial.includes(inputValue) ||
        full_name.includes(inputValue) ||
        abbreviation_name.includes(inputValue.toUpperCase())
      );
    });
    setListDatas(searchResult);
    setMockDatas(searchFakeResult);
  }, [inputValue]);

  return (
    <OuterContainer>
      <div>
        <EmojiBox star>
          <span>🌟</span>
        </EmojiBox>
        <div>
          <input
            placeholder="코인 검색"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <EmojiBox>
            <span>🔍</span>
          </EmojiBox>
        </div>
      </div>
      <div>
        <button>Main마켓</button>
        <button>Growth마켓</button>
      </div>
      <ListCaption>
        <P name grey>
          코인명
        </P>
        <P price grey>
          가격
        </P>
        <P ratio grey>
          등락률
        </P>
        <P volume grey>
          거래대금<span></span>
        </P>
      </ListCaption>
      <ScrollBox>
        {listDatas?.map((coin) => (
          <ListUnit
            key={coin.product_id}
            id={coin.product_id}
            onClick={() => {
              selectCoinOfList(coin.product_id);
              selectFakeCoin(coin.product_id);
            }}
            selectedCoin={selectedCoin}
            selectedFakeCoin={selectedFakeCoin}
          >
            <P name black>
              <div className="star">
                <span>⭐</span>
              </div>
              <div>
                <div>{coin.abbreviation_name}</div>
                <span>{coin.full_name}</span>
              </div>
            </P>
            <P price color={coin.change > 0}>
              {Number(coin.price_now).toFixed(2)}
            </P>
            <P ratio color={coin.change > 0}>
              {Number(coin.change).toFixed(2)}%
            </P>
            <P volume black>
              {numberToKorean(coin.traded_money)}
            </P>
          </ListUnit>
        ))}
        {
          mockDatas?.map((coin) => (
            <ListUnit
              key={coin.product_id}
              id={coin.product_id}
              onClick={() => selectFakeCoin(coin.product_id)}
              selectedCoin={selectedCoin}
              selectedFakeCoin={selectedFakeCoin}
            >
              <P name black>
                <div className="star">
                  <span>⭐</span>
                </div>
                <div>
                  <div>{coin.abbreviation_name}</div>
                  <span>{coin.full_name}</span>
                </div>
              </P>
              <P price color={coin.change > 0}>
                {Number(coin.price_now).toFixed(2)}
              </P>
              <P ratio color={coin.change > 0}>
                {Number(coin.change).toFixed(2)}%
              </P>
              <P volume black>
                {numberToKorean(coin.traded_money)}
              </P>
            </ListUnit>
          ))
          // :
        }
      </ScrollBox>
    </OuterContainer>
  );
};

export default CoinList;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(7, 4, 5, 1, 4)}
  ${({ theme }) => theme.flex(null, null, 'column')}
  padding: 30px 19px 10px;

  div {
    display: flex;

    input {
      width: 300px;
      height: 30px;
      background-color: #fafafa;
      border-radius: 8px;
      margin-left: 18px;
      padding-left: 15px;
      margin-bottom: 15px;
    }

    button {
      ${({ theme }) => theme.text('12px', 'normal', '#bdbdbd')}
      ${({ theme }) =>
        theme.border('1px', 'solid', '#eeeeee', null, '8px', null)}
      height: 32px;
      padding: 4px 9px;
      margin: 0 4px 15px;
    }
  }
`;

const ListCaption = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center', null)}
  ${({ theme }) => theme.text('14px', 'normal', '#bdbdbd')}
  ${({ theme }) => theme.border('1px', 'solid', '#e0e0e0', null, null, null)}
  border-left: 0;
  border-right: 0;
  height: 45px;
  width: 100%;
  padding: 9px;
`;

const P = styled.div`
  ${({ theme, price, ratio, volume }) =>
    theme.flex(price || ratio || volume ? 'flex-end' : null, 'center', null)}
  width: ${({ name, price, ratio }) =>
    name ? 100 : price ? 80 : ratio ? 60 : 81}px;
  margin: 0 1px;
  position: relative;
  text-align: right;
  color: ${({ theme, color, grey, black }) =>
    color && !grey && !black
      ? `${theme.up}`
      : !color && !grey && !black
      ? `${theme.down}`
      : grey
      ? '#bdbdbd'
      : '#1c1c1c'};
  .star {
    display: none;
  }

  div {
    ${({ theme }) => theme.flex('center', 'center', null)}
    ${({ theme }) => theme.text(null, 'bold', '#424242')}
    padding-bottom:10px;
    padding-left: 10px;
    font-weight: bold;
  }

  span {
    ${({ theme }) => theme.text('11px', 'normal', '#9e9e9e')}
    position: absolute;
    top: 20px;
    padding-left: 8px;
  }
`;

const ScrollBox = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')}
`;

const ListUnit = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center', null)}
  ${({ theme }) => theme.text('14px', 'normal', '#424242')}
  width: 111.5%;
  margin-left: -20px;
  padding-left: 15px;
  padding-right: 20px;
  height: 52px;
  cursor: pointer;
  border: ${({ id, selectedFakeCoin }) =>
    id === selectedFakeCoin ? '2px solid #91c7ff' : null};

  :hover div .star {
    display: block;
    position: relative;
    left: -15px;
    top: -25px;
    span {
      font-size: 16px;
    }
  }
`;

const EmojiBox = styled.div`
  padding-left: 20px;
  position: relative;
  span {
    position: absolute;
    top: 7px;
    left: ${({ star }) => (star ? '0px' : '-30px')};
  }
`;
