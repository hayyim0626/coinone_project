import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Popup = ({ view, TogglePopup }) => {
  return (
    <PopupBackground popView={view} onClick={TogglePopup}>
      <PopupInner>
        <p>수수료 무료 이벤트</p>
        <p>💸💸💸💸💸💸💸💸</p>
        <p>저희는 땅파서 장사합니다</p>
        <img src="https://cdn.pixabay.com/photo/2013/02/20/10/33/now-repairing-83678_960_720.jpg" />
        <Close onClick={TogglePopup}>X</Close>
      </PopupInner>
    </PopupBackground>
  );
};

export default Popup;

const PopupBackground = styled.div`
  ${({ theme }) => theme.flex('center', 'center', null)}
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ popView }) => (popView ? null : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: rgba(92, 92, 92, 0.5);
  z-index: 999;
  cursor: pointer;
`;

const PopupInner = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  background-color: white;
  border: 1px solid #efefef;
  border-radius: 8px;
  box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
  position: relative;
  width: 500px;
  height: 280px;

  p {
    margin: 4px;
  }

  img {
    width: 200px;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
`;
