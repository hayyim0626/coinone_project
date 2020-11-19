import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OrderHistory = ({ selectedCoin, res }) => {
  const [viewOderState, setViewOrderState] = useState(true);
  const [remainMyOrder, setRemainMyOrder] = useState([]);
  const [tradedOrder, setTradedOrder] = useState([]);

  useEffect(() => {
    let orderR = [];
    let orderT = [];
    if (res.traded_orders) {
      orderT = res.traded_orders.filter(
        (order) => order.product_id === selectedCoin
      );
    }
    if (res.remaining_orders) {
      orderR = res.remaining_orders.filter(
        (order) => order.product_id === selectedCoin
      );
    }
    setRemainMyOrder(orderR);
    setTradedOrder(orderT);
  }, [res, selectedCoin]);

  const timeTypeChange = (date) => {
    return (
      date.slice(2, 4) +
      '/' +
      date.slice(5, 7) +
      '/' +
      date.slice(8, 10) +
      '_' +
      date.slice(11, 19)
    );
  };
  return (
    <OuterContainer>
      <ul>
        <li>
          <Tab
            onClick={() => setViewOrderState(!viewOderState)}
            click={viewOderState}
          >
            미체결 주문
          </Tab>
        </li>
        <li>
          <Tab2
            onClick={() => setViewOrderState(!viewOderState)}
            click={viewOderState}
          >
            체결 내역
          </Tab2>
        </li>
      </ul>
      <EmptyTabContent
        tradeOrder={tradedOrder}
        remainOrder={remainMyOrder}
        click={viewOderState}
      >
        <span>📄</span>
        <p>주문 내역 없음</p>
      </EmptyTabContent>
      <TabContentList>
        {remainMyOrder?.map((order) => (
          <WaitTabContent
            click={viewOderState}
            key={order.order_id}
            order={order.buy_or_sell}
          >
            <div>
              <P order={order.buy_or_sell}>
                {order.product}
                <span>{order.buy_or_sell}</span>
                <span>{order.ordered_quantity}</span>
              </P>
              <span>🗑</span>
            </div>
            <div>
              <div>
                미체결량<button>수정</button>
                {/* <input />
                <span>🛠</span> */}
              </div>
              <div>{order.price}</div>
            </div>
            <div>
              <span>주문수량</span>
              <span>{order.remaining_quantity}</span>
            </div>
            <div>
              <span>주문시간</span>
              <span>{timeTypeChange(order.ordered_at)}</span>
            </div>
          </WaitTabContent>
        ))}
        {tradedOrder?.map((order) => (
          <CompleteTabContent
            click={viewOderState}
            key={order.order_id}
            order={order.buy_or_sell}
          >
            <div>
              <P order={order.buy_or_sell}>
                {order.product}
                <span>{order.buy_or_sell}</span>
                <span> {order.price}</span>
              </P>
            </div>
            <div>
              <div>수량</div>
              <div>{order.traded_quantity}</div>
            </div>
            <div>
              <span>체결시간</span>
              <span>{timeTypeChange(order.traded_at)}</span>
            </div>
          </CompleteTabContent>
        ))}
      </TabContentList>
    </OuterContainer>
  );
};

export default OrderHistory;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(6, 3, 4, 5, 7)}
  ${({ theme }) => theme.flex(null, null, 'column')}
`;

const Tab = styled.li`
  ${({ theme, click }) =>
    theme.text('14px', click ? 'bold' : 'normal', click ? 'black' : '#9e9e9e')}
  padding: 14px;
  text-align: center;
  float: left;
  width: 50%;
  height: 40px;
  border-bottom: ${({ click }) => (click ? '3px' : '1px')} solid
    ${({ click }) => (click ? '#1772f8' : '#dbdbdb')};
  cursor: pointer;
`;

const Tab2 = styled(Tab)`
  ${({ theme, click }) =>
    theme.text('14px', click ? 'normal' : 'bold', click ? '#9e9e9e' : 'black')}
  border-bottom: ${({ click }) => (click ? '1px' : '3px')} solid
    ${({ click }) => (click ? '#dbdbdb' : '#1772f8')};
  cursor: pointer;
`;

const EmptyTabContent = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')};
  padding-top: 90px;
  font-size: 80px;
  opacity: 0.35;
  display: ${({ click, tradeOrder, remainOrder }) =>
    click && !remainOrder.length
      ? null
      : !click && !tradeOrder.length
      ? null
      : !tradeOrder.length && !remainOrder.length
      ? null
      : 'none'};

  p {
    ${({ theme }) => theme.text('14px', 'normal', '#424242')}
    padding-top:50px;
  }
`;
const TabContentList = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')};
  padding: 0 25px;
  overflow-y: scroll;
`;

const WaitTabContent = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')};
  ${({ theme }) => theme.text('13px', 'normal', '#9e9e9e')};
  padding: 20px 0;
  border-bottom: 1px solid #dbdbdb;
  display: ${({ click }) => (!click ? 'none' : null)};

  div {
    ${({ theme }) => theme.flex('space-between', 'center', null)};
    margin-bottom: 10px;

    div {
      ${({ theme }) => theme.flex('flex-start', null, null)};
      margin-bottom: 0px;
      color: #424242;

      button {
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        font-size: 9px;
        margin-left: 8px;
        width: 45px;
      }

      input {
        margin: 0 5px;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        width: 50px;
      }
    }
  }
`;

const CompleteTabContent = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')};
  ${({ theme }) => theme.text('13px', 'normal', '#9e9e9e')};
  display: ${({ click }) => (click ? 'none' : null)};
  padding: 20px 0;
  border-bottom: 1px solid #dbdbdb;

  div {
    ${({ theme }) => theme.flex('space-between', 'center', null)};
    margin-bottom: 10px;

    div {
      ${({ theme }) => theme.flex('flex-start', null, null)};
      margin-bottom: 0px;
      color: #424242;

      button {
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        font-size: 9px;
        margin-left: 8px;
        width: 45px;
      }
    }
  }
`;

const P = styled.p`
  ${({ theme, order }) =>
    theme.text(
      '13px',
      'bold',
      order == '매도'
        ? `${theme.down}`
        : order == '매수'
        ? `${theme.up}`
        : `${theme.up}`
    )};

  span {
    margin: 0 2px 0 8px;
    font-weight: normal;
  }
`;
