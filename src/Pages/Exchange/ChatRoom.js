import React from 'react';
import Chatting from '../../Components/Chatting/Chatting';
import styled from 'styled-components';

const ChatRoom = () => {
  return (
    <OuterContainer>
      <Chatting />
    </OuterContainer>
  );
};

export default ChatRoom;

const OuterContainer = styled.div`
  ${({ theme }) => theme.whiteBox(9, 4, 5, 6, 7)}
  ${({ theme }) => theme.flex(null, null, 'column')}
`;
