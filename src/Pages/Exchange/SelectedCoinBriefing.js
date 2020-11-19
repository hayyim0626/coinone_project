import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SelectedCoinBriefing = ({ res, selectedCoin }) => {
  const [briefingData, setBriefingData] = useState({});

  useEffect(() => {
    const briefing = res.filter((data) => data.product_id === selectedCoin);
    setBriefingData(briefing[0]);
  }, [res, selectedCoin]);

  return (
    <OuterContainer>
      <FlexBox>
        <Text size={16} bold black>
          {briefingData.abbreviation_name}
        </Text>
        <Text black>{briefingData.full_name}</Text>
        <Text grey>{briefingData.market}</Text>
      </FlexBox>
      <FlexBox>
        <Text size={28} bold color={Math.sign(Number(briefingData.change)) > 0}>
          {Number(briefingData.price_now).toFixed(2)}
        </Text>
        <Text color={Math.sign(Number(briefingData.change)) > 0}>
          {Number(briefingData.change).toFixed(2)}%
        </Text>
        <RelativeBox>
          <Text color={Math.sign(Number(briefingData.change)) > 0}>(</Text>
          <Triangle color={Math.sign(Number(briefingData.change)) > 0} />
          <Text color={Math.sign(Number(briefingData.change)) > 0} right>
            {Number(briefingData.change_price).toFixed(2)})
          </Text>
        </RelativeBox>
      </FlexBox>
      <FlexBox>
        <Text>🌟</Text>
        <Text grey>고가</Text>
        <Text up>{Number(briefingData.high).toFixed(2)}</Text>
        <Text grey>저가</Text>
        <Text down>{Number(briefingData.low).toFixed(2)}</Text>
        <Text grey>거래량</Text>
        <Text>{briefingData.today_volume}</Text>
        <Text grey>BTC</Text>
        <Text grey>거래대금</Text>
        <Text>{Number(briefingData.traded_money).toFixed(2)}</Text>
        <Text grey>KRW</Text>
      </FlexBox>
    </OuterContainer>
  );
};

export default SelectedCoinBriefing;
const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(1, 1, 4, 1, 2)}
  ${({ theme }) => theme.flex(null, null, 'column')}
  padding: 19px;
`;

const FlexBox = styled.div`
  ${({ theme }) => theme.flex(null, null, null)}
  margin: 4px 0;
`;

const Text = styled.span`
  ${({ theme, size, bold, grey, up, down, color, black }) =>
    theme.text(
      size ? `${size}px` : '14px',
      bold ? 'bold' : 'normal',
      grey
        ? '#9e9e9e'
        : up
        ? `${theme.up}`
        : down
        ? `${theme.down}`
        : color
        ? `${theme.up}`
        : !color && !black
        ? `${theme.down}`
        : !color && black
        ? '#424242'
        : '#424242'
    )}
  margin-right:4px;
`;

const Triangle = styled.div`
  position: relative;
  display: block;
  width: 0px;
  border: 9px solid transparent;
  content: '';
  z-index: 1;
  top: ${({ color }) => (color ? '-15px' : '2px')};
  margin-right: 5px;
  border-top: ${({ color }) => (color ? 'none' : null)};
  border-bottom: ${({ color }) => (color ? null : 'none')};
  border-top-color: ${({ theme, color }) =>
    color ? `${theme.up}` : `${theme.down}`};
  border-bottom-color: ${({ theme, color }) =>
    color ? `${theme.up}` : `${theme.down}`};
`;

const RelativeBox = styled.div`
  display: flex;
  position: relative;
`;
