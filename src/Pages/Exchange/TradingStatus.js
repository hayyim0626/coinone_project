import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TradingStatus = ({ res, selectedCoin, newdate }) => {
  const [realTimeDatas, setRealTimeDatas] = useState([]);

  useEffect(() => {
    setRealTimeDatas(res);
  }, [res, selectedCoin]);

  return (
    <OuterContainer>
      <Head>
        <p>체결내역</p>
        <p>가격</p>
        <p>수량</p>
      </Head>
      <ScrollBody>
        {realTimeDatas?.map((realTimeData, index) =>
          index < 23 ? (
            <MapUnit
              key={index}
              newdate={newdate}
              real={realTimeData.traded_time}
            >
              <p>{realTimeData.traded_time.split('').slice(11, 19).join('')}</p>
              <Text
                up={realTimeData.color === 'red'}
                down={realTimeData.color === 'blue'}
              >
                {Number(realTimeData.price).toFixed(2)}
              </Text>
              <Text
                up={realTimeData.color === 'red'}
                down={realTimeData.color === 'blue'}
              >
                {Number(realTimeData.quantity).toFixed(2)}
              </Text>
            </MapUnit>
          ) : (
            ''
          )
        )}
      </ScrollBody>
    </OuterContainer>
  );
};

export default TradingStatus;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(3, 1, 2, 3, 7)}
  ${({ theme }) => theme.flex(null, null, 'column')}
  padding: 10px;
`;

const Head = styled.div`
  ${({ theme }) => theme.flex('space-around', 'center', null)}
  padding: 4px 0 10px;
  border-bottom: 0.5px solid #dbdbdb;

  p {
    ${({ theme }) => theme.text('14px', 'normal', '#bdbdbd')}
  }
`;

const ScrollBody = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')}
  width: 100%;
`;
const MapUnit = styled.div`
  ${({ theme }) => theme.flex('space-around', 'center', null)}
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
  animation-name: ${({ real, newdate }) =>
    real === newdate ? 'updatingData' : null};
  animation-duration: ${({ real, newdate }) =>
    real === newdate ? '1s' : null};
  animation-timing-function: ${({ real, newdate }) =>
    real === newdate ? 'ease-out' : null};
  width: 100%;
  height: 34px;

  p {
    ${({ theme }) => theme.text('14px', 'normal', '#424242')}
  }
`;

const Text = styled.span`
  ${({ theme, size, bold, grey, up, down }) =>
    theme.text(
      size ? `${size}px` : '14px',
      bold ? 'bold' : 'normal',
      grey ? '#9e9e9e' : up ? `${theme.up}` : down ? `${theme.down}` : '#424242'
    )}
`;
