import React from 'react';
import StockChart from './StockChart';
import styled from 'styled-components';

const SelectedCoinChart = ({ selectedCoin, selectedFakeCoin }) => {
  return (
    <OuterContainer>
      <StockChart
        selectedCoin={selectedCoin}
        selectedFakeCoin={selectedFakeCoin}
      />
    </OuterContainer>
  );
};

export default SelectedCoinChart;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(2, 1, 4, 2, 3)}
  ${({ theme }) => theme.flex(null, null, 'column')}
`;
