import React, { useState, useEffect } from 'react';
import OrderSheetContent from './Ordersheet/OrderSheetContent';
import styled from 'styled-components';

const OrderSheet = ({ res, selectedCoin, handleTradeEvent }) => {
  const [isClicked, setIsClicked] = useState(true);
  const [asset, setAsset] = useState([]);
  const [totalAsset, setTotalAsset] = useState(0);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    const [asset] = res.coin_list?.filter(
      (data) => data.product_id === selectedCoin
    );
    setAsset(asset);
    setTotalAsset(res.won_balance);
    setAvailable(res.available_balance);
  }, [res, selectedCoin]);

  return (
    <OuterContainer>
      <ul>
        <li>
          <BuyTab onClick={() => setIsClicked(!isClicked)} click={isClicked}>
            매수
          </BuyTab>
        </li>
        <li>
          <SellTab onClick={() => setIsClicked(!isClicked)} click={isClicked}>
            매도
          </SellTab>
        </li>
      </ul>
      <OrderSheetContent
        handleTradeEvent={handleTradeEvent}
        click={isClicked}
        unit={asset?.coin_code}
        asset={Number(asset?.quantity)}
        price={Number(asset?.current_price)}
        assetResidue={Number(asset?.available_coin)}
        krwtotal={Number(totalAsset)}
        krwResidue={Number(available)}
        selectedCoin={selectedCoin}
      />
    </OuterContainer>
  );
};

export default OrderSheet;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(5, 3, 4, 3, 5)}
  ${({ theme }) => theme.flex(null, null, 'column')}
`;

const BuyTab = styled.li`
  ${({ theme, click }) =>
    theme.text('14px', 'normal', click ? 'white' : '#9e9e9e')}
  padding: 14px;
  text-align: center;
  float: left;
  width: 50%;
  height: 44px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  background-color: ${({ theme, click }) =>
    click ? `${theme.up}` : '#e0e0e0'};
`;

const SellTab = styled(BuyTab)`
  ${({ theme, click }) =>
    theme.text('14px', 'normal', click ? '#9e9e9e' : 'white')}
  background-color: ${({ theme, click }) =>
    click ? '#e0e0e0' : `${theme.down}`};
  cursor: pointer;
`;
