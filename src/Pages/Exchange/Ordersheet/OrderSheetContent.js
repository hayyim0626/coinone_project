import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Popup from './Popup';

const OrderSheetContent = ({
  click,
  unit,
  asset,
  price,
  assetResidue,
  krwtotal,
  krwResidue,
  selectedCoin,
  handleTradeEvent,
}) => {
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderVolume, setOrderVolume] = useState(0);
  const [isView, setIsView] = useState(false);

  const TogglePopup = () => {
    setIsView(!isView);
  };

  const orderStock = (e) => {
    e.preventDefault();
    fetch(`http://10.58.7.141:8000/orders/${click ? 'buy' : 'sell'}`, {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.9oAJOkMeDuoxPbeuBpJTURmIhOzUJc3MqWcYqVN_IpI',
      },
      body: JSON.stringify({
        price: orderPrice,
        product_id: selectedCoin,
        quantity: orderVolume,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'SUCCESS' || 'SOLD') {
          alert('😍주문 요청 완료💓');
        } else if (result.mesaage === 'INVALID_REQUEST') {
          alert('거래가능한 자산을 확인해 주세요');
        } else if (result.mesaage === 'DOES_NOT_EXIST') {
          alert('계좌연결을 먼저 해주세용!');
        }
      });
    setOrderVolume(0);
    setOrderPrice(0);
    handleTradeEvent();
  };

  return (
    <Content>
      <FlexBox>
        <div>보유</div>
        <div>
          <span>{click ? krwtotal : asset}</span>
          <span className="unit">{click ? 'KRW' : unit}</span>
        </div>
      </FlexBox>
      <FlexBox>
        <div>{click ? '매수' : '매도'}가능</div>
        <div>
          <span>{click ? krwResidue : assetResidue}</span>
          <span className="unit">{click ? 'KRW' : unit}</span>
        </div>
      </FlexBox>
      <FlexBoxLabel>가격(KRW)</FlexBoxLabel>
      <InputBox>
        <input
          value={orderPrice}
          onChange={(e) => setOrderPrice(e.target.value)}
        ></input>
        <Minus
          onClick={() => {
            setOrderPrice(orderPrice !== 0 ? orderPrice - 1 : 0);
          }}
        >
          -
        </Minus>
        <Plus
          onClick={() => {
            setOrderPrice(orderPrice + 1);
          }}
        >
          +
        </Plus>
      </InputBox>
      <FlexBoxLabel>수량({unit})</FlexBoxLabel>
      <InputBox>
        <input
          value={orderVolume}
          onChange={(e) => setOrderVolume(e.target.value)}
        ></input>
        <Minus
          onClick={() => {
            setOrderVolume(orderVolume !== 0 ? orderVolume - 1 : 0);
          }}
        >
          -
        </Minus>
        <Plus
          onClick={() => {
            setOrderVolume(orderVolume + 1);
          }}
        >
          +
        </Plus>
      </InputBox>
      <PercentBox>
        <PercentButton
          onClick={() =>
            setOrderVolume(0.1 * click ? krwResidue : assetResidue)
          }
        >
          10%
        </PercentButton>
        <PercentButton
          onClick={() =>
            setOrderVolume(0.25 * click ? krwResidue : assetResidue)
          }
        >
          25%
        </PercentButton>
        <PercentButton
          onClick={() =>
            setOrderVolume(0.5 * click ? krwResidue : assetResidue)
          }
        >
          50%
        </PercentButton>
        <PercentButton
          onClick={() => setOrderVolume(1 * click ? krwResidue : assetResidue)}
        >
          100%
        </PercentButton>
      </PercentBox>
      <GreyTextBox>
        <div>주문 금액</div>
        <div>
          <span>{orderPrice * orderVolume}</span>
          <span className="unit">KRW</span>
        </div>
      </GreyTextBox>
      <GreyTextBox>
        <div>{click ? '매수 수량' : '매도 금액'}</div>
        <div>
          <span>{click ? orderVolume : orderPrice * orderVolume}</span>
          <span className="unit">{unit}</span>
        </div>
      </GreyTextBox>
      <OrderButton click={click} onClick={(e) => orderStock(e)}>
        {click ? '매수' : '매도'}
      </OrderButton>
      <RightAlignGreyTextBox onClick={TogglePopup}>
        <div>수수료-{unit}</div>
        <span>i</span>
      </RightAlignGreyTextBox>
      <Popup view={isView} TogglePopup={TogglePopup} />
    </Content>
  );
};

export default OrderSheetContent;

const Content = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')}
  padding: 20px 25px;
`;

const FlexBox = styled.div`
  ${({ theme }) => theme.flex('space-between', null, null)}
  ${({ theme }) => theme.text('13px', 'normal', '#424242')}
  padding-bottom:15px;

  span {
    margin-right: 5px;
  }

  .unit {
    margin-right: 0;
    ${({ theme }) => theme.text('13px', 'normal', '#9e9e9e')}
  }
`;

const FlexBoxLabel = styled(FlexBox)`
  padding: 5px 0 2px;
`;

const InputBox = styled.div`
  ${({ theme }) => theme.flex(null, null, null)};
  ${({ theme }) => theme.text('18px', 'normal', '#424242')};
  height: 32px;
  margin: 5px 0;

  input {
    padding: 0 4px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #dbdbdb;
    width: 70%;
    text-align: right;
  }
`;

const Minus = styled.button`
  ${({ theme }) => theme.text('22px', 'normal', '#333333')};
  width: 15%;
  border: 1px solid #dbdbdb;
  border-left-color: transparent;
  border-right-color: transparent;
  cursor: pointer;
`;
const Plus = styled.button`
  ${({ theme }) => theme.text('22px', 'normal', '#333333')};
  width: 15%;
  border-radius: 0 4px 4px 0;
  border: 1px solid #dbdbdb;
  cursor: pointer;
`;

const PercentBox = styled.div`
  ${({ theme }) => theme.flex('space-around', 'center', 'row')};
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  height: 30px;
  margin-bottom: 20px;
`;

const PercentButton = styled.button`
  ${({ theme }) => theme.text('12px', 'normal', '#666666')}
  cursor: pointer;
  width: 100%;
  height: 100%;

  :hover {
    background-color: #eeeeee;
  }
`;

const GreyTextBox = styled(FlexBox)`
  ${({ theme }) => theme.text('13px', 'normal', '#9e9e9e')}
  padding-bottom:15px;

  span {
    margin-right: 5px;
    ${({ theme }) => theme.text('13px', 'normal', '#424242')}
  }
`;

const OrderButton = styled.button`
  border-radius: 4px;
  background-color: ${({ theme, click }) => (click ? theme.up : theme.down)};
  height: 36px;
  color: white;
  cursor: pointer;
`;

const RightAlignGreyTextBox = styled.div`
  margin-top: 10px;
  width: 100%;
  ${({ theme }) => theme.flex('flex-end', 'center', 'row')};
  ${({ theme }) => theme.text('12px', 'normal', '#9e9e9e')};
  cursor: pointer;
  span {
    font-weight: bold;
    margin-left: 2px;
    width: 12px;
    text-align: center;
    border-radius: 50%;
    background-color: #9e9e9e;
    color: white;
  }
`;
