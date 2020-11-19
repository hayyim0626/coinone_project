import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyAsset = ({ res }) => {
  const [totalAsset, setTotalAsset] = useState();
  const [rate, setRate] = useState();

  useEffect(() => {
    setTotalAsset(res.total_asset);
    setRate(res.profit_rate);
  }, [res]);

  return (
    <OuterContainer>
      <div>
        <Text grey>자산 평가 금액</Text>
        <Link to="/profit">
          <Text grey>
            더보기 <span>👉</span>
          </Text>
        </Link>
      </div>
      <div>
        <div>
          <Text size={22} grey>
            <span>👁‍🗨</span>
          </Text>
          <Text size={25} bold black>
            {Number(totalAsset).toLocaleString()}원
          </Text>
          <Text size={18} color={rate > 0}>
            {rate}%
          </Text>
        </div>
      </div>
      <div></div>
      <div></div>
    </OuterContainer>
  );
};

export default MyAsset;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(8, 4, 5, 4, 6)}
  ${({ theme }) => theme.flex(null, null, 'column')}
padding: 34px 20px 20px;
  div {
    ${({ theme }) => theme.flex('space-between', 'center', null)}
    div span {
      margin-right: 8px;
    }
  }
`;

const Text = styled.span`
  ${({ theme, size, bold, grey, color, black }) =>
    theme.text(
      size ? `${size}px` : '14px',
      bold ? 'bold' : 'normal',
      grey
        ? '#9e9e9e'
        : black
        ? '#424242'
        : color
        ? `${theme.up}`
        : !color
        ? `${theme.down}`
        : '#424242'
    )}
  margin: 8px 0px;
`;
