import React, { useEffect, useState, useRef } from 'react';
import Nav from '../../Components/Nav/Nav';
import SelectedCoinBriefing from './SelectedCoinBriefing';
import SelectedCoinChart from './SelectedCoinChart';
import TradingStatus from './TradingStatus';
import PriceRange from './PriceRange';
import OrderSheet from './OrderSheet';
import OrderHistory from './OrderHistory';
import CoinList from './CoinList';
import MyAsset from './MyAsset';
import ChatRoom from './ChatRoom';
import styled from 'styled-components';
import { wallstreetApi } from '../../Config';

const Exchange = () => {
  const [listRes, setListRes] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(6);
  const [selectedFakeCoin, setSelectedFakeCoin] = useState(6);
  const [assetRes, setAssetRes] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const [pricelistRes, setPriceListRes] = useState({});
  const [transactionRes, setTransactionRes] = useState([]);
  const [tradeEvent, setTradeEvent] = useState(false);
  const [mockDataRes, setMockDataRes] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const selectCoinOfList = (id) => {
    setSelectedCoin(id);
  };

  const selectFakeCoin = (id) => {
    setSelectedFakeCoin(id);
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const coinListFetch = () => {
    fetch(`${wallstreetApi}/products`)
      .then((res) => res.json())
      .then((res) => {
        setListRes(res.message);
      });
  };

  const assetFetch = () => {
    fetch(`${wallstreetApi}/accounts/assets`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAssetRes(res);
      });
  };

  const myOrderFetch = () => {
    fetch(`${wallstreetApi}/orders/myorders`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMyOrder(res.message);
      });
  };

  const priceRangeFetch = () => {
    fetch(`${wallstreetApi}/orders/${selectedCoin}`)
      .then((res) => res.json())
      .then((res) => {
        setPriceListRes(res.message);
      });
  };

  const transactionFetch = () => {
    fetch(`${wallstreetApi}/orders/transactions/${selectedCoin}`)
      .then((res) => res.json())
      .then((res) => {
        setTransactionRes(res.message);
      });
  };

  const MockdataFetch = () => {
    fetch(`http://localhost:3000/data/Exchange/pricelist.json`)
      .then((res) => res.json())
      .then((res) => {
        setMockDataRes(res.listdata);
      });
  };

  const handleTradeEvent = () => {
    setTradeEvent(!tradeEvent);
  };

  useInterval(coinListFetch, 7000);
  useInterval(assetFetch, 7000);
  useInterval(myOrderFetch, 7000);
  useInterval(priceRangeFetch, 7000);
  useInterval(transactionFetch, 7000);

  useEffect(() => {
    setLoadingStatus(true);
    coinListFetch();
    assetFetch();
    myOrderFetch();
    priceRangeFetch();
    transactionFetch();
    MockdataFetch();
    setTimeout(() => {
      setLoadingStatus(false);
    }, 6000);
  }, [selectedCoin, tradeEvent]);

  return (
    <>
      <LoadingImg loadingStatus={loadingStatus}>
        <img alt="loadingImg" src="/images/img_issue_loading.gif" />
      </LoadingImg>
      <Nav />
      <MarginProvider>
        <ExchangeContainer>
          {listRes.length && (
            <SelectedCoinBriefing res={listRes} selectedCoin={selectedCoin} />
          )}

          <SelectedCoinChart
            selectedCoin={selectedCoin}
            selectedFakeCoin={selectedFakeCoin}
          />
          {transactionRes.length && (
            <TradingStatus
              newdate={transactionRes[0]?.traded_time}
              selectedCoin={selectedCoin}
              res={transactionRes}
            />
          )}
          {Object.keys(pricelistRes).length && (
            <PriceRange selectedCoin={selectedCoin} res={pricelistRes} />
          )}
          {Object.keys(assetRes).length && (
            <OrderSheet
              handleTradeEvent={handleTradeEvent}
              selectedCoin={selectedCoin}
              res={assetRes}
            />
          )}
          <OrderHistory selectedCoin={selectedCoin} res={myOrder} />
          <CoinList
            res={listRes}
            mockRes={mockDataRes}
            selectedCoin={selectedCoin}
            selectCoinOfList={selectCoinOfList}
            selectedFakeCoin={selectedFakeCoin}
            selectFakeCoin={selectFakeCoin}
          />
          {Object.keys(assetRes).length && <MyAsset res={assetRes} />}

          <ChatRoom />
        </ExchangeContainer>
      </MarginProvider>
    </>
  );
};

export default Exchange;

const LoadingImg = styled.div`
  z-index: 10000;
  position: absolute;
  top: 40%;
  left: 40%;
  display: ${({ loadingStatus }) => !loadingStatus && 'none'};
`;

const MarginProvider = styled.div`
  margin-top: 70px;
`;

const ExchangeContainer = styled.div`
  background-color: transparent;
  margin: auto;
  width: 1440px;
  padding: 0 20px 20px 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: 282px 381px 291px 383px;
  grid-template-rows: 127px 430px 192px 240px 67px 277px;
  grid-template-areas:
    '1 1 1 7'
    '2 2 2 7'
    '3 4 5 7'
    '3 4 5 8'
    '3 4 6 8'
    '3 4 6 9';
`;
