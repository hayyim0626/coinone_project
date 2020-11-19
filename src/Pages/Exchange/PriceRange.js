import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { numberToKorean, sortAscending, sortDescending } from './utility';

const PriceRange = ({ res, selectedCoin }) => {
  const [buyWaiting, setBuyWaiting] = useState([]);
  const [sellWaiting, setSellWaiting] = useState([]);
  const [buyTotal, setBuyTotal] = useState('');
  const [sellTotal, setSellTotal] = useState('');

  // useEffect(() => {
  //   priceSort();
  //   // setSellTotal(sellList[0][1]);
  //   // setBuyTotal(buyList[buyList.length - 1][1]);
  //   // setSellWaiting(sellArr);
  //   // setBuyWaiting(buyArr);
  // }, [res, selectedCoin]);

  // const priceSort = () => {
  //   const sellList = Object.entries(res.sell).sort(sortDescending);
  //   const buyList = Object.entries(res.buy).sort(sortAscending);
  //   const toReduceArr = [sellList, buyList];
  //   toReduceArr.forEach((arr) => {
  //     arr.reduce(reducer, [0, 0, 0]);
  //   });
  //   console.log(sellList);
  //   console.log(toReduceArr);
  // };

  // const reducer = (acc, cur, idx, arr) => {
  //   const standard = arr[9][0];
  //   const [price, quantity] = cur;
  //   const volume = Number(price) * quantity;
  //   const [priceVolumeBefore, quantityBefore] = acc;
  //   const nextQuantity = quantityBefore + quantity;
  //   const nextPriceVolume = priceVolumeBefore + Number(price) * quantity;
  //   if (0 <= idx <= 8) {
  //     acc.push(volume);
  //   }
  //   if (9 < idx || price !== 'total_quantity') {
  //     [nextQuantity, nextPriceVolume].unshift(`${standard}이상`);
  //   }
  // };

  useEffect(() => {
    let sellArr = [];
    let buyArr = [];
    let sellList = [];
    let buyList = [];

    Array.prototype.push.apply(
      sellList,
      Object.entries(res.sell).sort(sortAscending)
    );

    Array.prototype.push.apply(
      buyList,
      Object.entries(res.buy).sort(sortDescending)
    );
    if (sellList.length > 11) {
      let sum = 0;
      let sumTotal = 0;
      let standard = sellList[sellList.length - 9][0];
      for (var i = 1; i < sellList.length - 9; i++) {
        sum = sum + sellList[i][1];
        sumTotal = sumTotal + sellList[i][0] * sellList[i][1];
      }
      sellArr.push([`${standard} 이상`, sum, sumTotal]);
      for (var i = sellList.length - 9; i < sellList.length; i++) {
        sellArr.push([...sellList[i], sellList[i][0] * sellList[i][1]]);
      }
    }
    if (sellList.length <= 10) {
      for (var i = 1; i < sellList.length; i++) {
        sellArr.push([...sellList[i], sellList[i][0] * sellList[i][1]]);
      }
    }
    if (buyList.length > 11) {
      let sum = 0;
      let sumTotal = 0;
      let standard = buyList[9][0];
      for (var i = 9; i < buyList.length - 1; i++) {
        sum = sum + buyList[i][1];
        sumTotal = sumTotal + buyList[i][0] * buyList[i][1];
      }
      for (var i = 0; i < 9; i++) {
        buyArr.push([...buyList[i], buyList[i][0] * buyList[i][1]]);
      }
      buyArr.push([`${standard} 이상`, sum, sumTotal]);
    }
    if (buyList.length <= 10) {
      for (var i = 0; i < buyList.length - 1; i++) {
        buyArr.push([...buyList[i], buyList[i][0] * buyList[i][1]]);
      }
    }

    setSellTotal(sellList[0][1].toFixed(2));
    setBuyTotal(buyList[buyList.length - 1][1].toFixed(2));

    for (let i = 0; i < buyArr.length; i++) {
      for (let e = 0; e < buyWaiting.length; e++) {
        if (
          buyArr[i][0] === buyWaiting[e][0] &&
          buyArr[i][1] === buyWaiting[e][1]
        ) {
          buyArr[i][3] = false;
          continue;
        }
      }
      if (buyArr[i][3] !== false) {
        buyArr[i][3] = true;
      }
    }
    for (let i = 0; i < sellArr.length; i++) {
      for (let e = 0; e < sellWaiting.length; e++) {
        if (
          sellArr[i][0] === sellWaiting[e][0] &&
          sellArr[i][1] === sellWaiting[e][1]
        ) {
          sellArr[i][3] = false;
          continue;
        }
      }
      if (sellArr[i][3] !== false) {
        sellArr[i][3] = true;
      }
    }
    setSellWaiting(sellArr);
    setBuyWaiting(buyArr);
  }, [res, selectedCoin]);

  return (
    <OuterContainer>
      <InnerNav>
        <SelectUnit>
          <Button>
            <span>-</span>
          </Button>
          <p>1000</p>
          <Button>
            <span>+</span>
          </Button>
        </SelectUnit>
        <Amount>수량</Amount>
        <PriceFilter>
          <p>주문금액</p>
        </PriceFilter>
      </InnerNav>
      <SellList>
        {sellWaiting?.map((el, idx) => (
          <MapUnit key={idx} update={el[3]}>
            <Text bold down price>
              {el[0]}
            </Text>
            <div>
              <Text down volume>
                {numberToKorean(el[1])}
              </Text>
              <Text down>{numberToKorean(el[2])}</Text>
            </div>
          </MapUnit>
        ))}
      </SellList>
      <BuyList>
        {buyWaiting?.map((el, idx) => (
          <MapUnit key={idx} update={el[3]}>
            <Text bold up price>
              {el[0]}
            </Text>
            <div>
              <Text up volume>
                {numberToKorean(el[1])}
              </Text>
              <Text up>{numberToKorean(el[2])}</Text>
            </div>
          </MapUnit>
        ))}
      </BuyList>
      <InnerFooter>
        <div>
          <p>매도잔량</p>
          <p>{sellTotal}</p>
          <p>매수잔량</p>
          <p>{buyTotal}</p>
        </div>
        <div>
          <OrderButton>
            <span>🛒 </span>클릭주문
          </OrderButton>
          <div>
            <SwitchButton>개별</SwitchButton>
            <SwitchButton>누적</SwitchButton>
          </div>
        </div>
      </InnerFooter>
    </OuterContainer>
  );
};

export default PriceRange;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(4, 2, 3, 3, 7)}
  ${({ theme }) => theme.flex(null, null, 'column')}
  padding:15px;
  position: relative;
`;

const InnerNav = styled.div`
  ${({ theme }) => theme.flex(null, 'center', null)}
  position:absolute;
  top: 11px;
  height: 28px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #dbdbdb;

  p {
    font-size: 14px;
    font-weight: normal;
    color: #bdbdbd;
  }
`;

const InnerFooter = styled.div`
  ${({ theme }) => theme.flex(null, 'center', 'column')}
  height:66px;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  border-top: 0.5px solid #dbdbdb;
  div {
    ${({ theme }) => theme.flex('space-between', 'center', null)}
    height: 33px;
    padding: 0 15px;
    width: 100%;
    div {
      ${({ theme }) => theme.flex('flex-end', 'center', null)}
      padding: 0;
    }
  }
  p {
    ${({ theme }) => theme.text('10px', 'normal', '#9e9e9e')}
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.flex('center', 'center', null)}
  width: 14px;
  height: 14px;
  border: 1px solid;
  border-radius: 2.5px;
  border-color: ${(props) => (props.click ? '#9e9e9e' : '#dbdbdb')};
  color: ${(props) => (props.click ? '#9e9e9e' : '#bdbdbd')};
  cursor: pointer;

  span {
    font-size: 14px;
  }
`;

const OrderButton = styled.button`
  padding: 0 0 3px;
  font-size: 12px;
  width: 105px;
  height: 27px;
  border: 1px solid #dbdbdb;
  border-radius: 2.5px;
  cursor: pointer;
  color: #aaaaaa;
`;

const SwitchButton = styled.button`
  padding: 0 0 3px;
  font-size: 12px;
  width: 40px;
  height: 27px;
  border: 1px solid #dbdbdb;
  border-radius: 2.5px;
  cursor: pointer;
  color: #aaaaaa;
  margin-left: 4px;
`;
const Amount = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #bdbdbd;
  width: 100px;
  text-align: right;
`;

const SelectUnit = styled.div`
  ${({ theme }) => theme.flex('space-around', null, null)}
  width: 101px;
`;

const PriceFilter = styled.div`
  ${({ theme }) => theme.flex('flex-end', null, null)}
  width:141px;
`;

const SellList = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')}
  position:absolute;
  top: 39.5px;
`;

const BuyList = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')}
  position:absolute;
  top: 398px;
`;

const Text = styled.span`
  ${({ theme }) => theme.flex('flex-end', 'center', 'row')}
  ${({ theme, size, bold, grey, up, down }) =>
    theme.text(
      size ? `${size}px` : '14px',
      bold ? 'bold' : 'normal',
      grey ? '#9e9e9e' : up ? `${theme.up}` : down ? `${theme.down}` : '#424242'
    )};
  background-color: ${({ price, up, down }) =>
    price && down ? '#f0f6ff' : price && up ? '#fff2f2' : 'transparent'};
  width: ${({ price, volume }) =>
    price ? '101px' : volume ? '100px' : '140px'};
  height: 36px;
  padding: 0 4px;
`;

const MapUnit = styled.div`
  ${({ theme }) => theme.flex(null, 'center', 'row')}
  position:relative;
  text-align: right;
  height: 36px;
  @keyframes updatingData {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation-name: ${({ update }) => (update ? 'updatingData' : null)};
  animation-duration: ${({ update }) => (update ? '1s' : null)};
  animation-timing-function: ${({ update }) => (update ? 'ease-out' : null)};
  div {
    ${({ theme }) => theme.flex('space-between', 'center', 'row')}
  }
`;
