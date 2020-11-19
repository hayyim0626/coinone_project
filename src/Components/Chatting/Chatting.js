import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import styled from 'styled-components';
import { chattingApi } from '../../Config';

const Chatting = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMonitor, setChatMonitor] = useState([]);
  const [recentChat, setRecentChat] = useState('');
  const socket = socketio.connect(`${chattingApi}`);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      e.target.value = '';
      socket.emit('message', { inputMessage });
    } else {
      setInputMessage(e.target.value);
    }
  };

  const handleClick = (e) => {
    socket.emit('message', { inputMessage });
    e.target.previousSibling.value = '';
  };

  const scrollToBottom = async () => {
    await document.getElementById('chatMonitor').scrollBy({ top: 100 });
  };

  useEffect(() => {
    socket.on('upload', (data) => {
      setRecentChat(data.inputMessage);
    });
  }, []);

  useEffect(() => {
    recentChat.length != 0 && setChatMonitor([...chatMonitor, recentChat]);
    scrollToBottom();
  }, [recentChat]);

  return (
    <ChattingWrap>
      <ChattingBox>
        <ChatNav>
          <span>채팅</span>
        </ChatNav>
        <Monitor id="chatMonitor">
          {chatMonitor.map((el, idx) => (
            <div key={idx}>
              <span>{el}</span>
            </div>
          ))}
        </Monitor>
        <SendMessageBox>
          <input onKeyUp={handleInput} placeholder="메세지 입력" />
          <button onClick={handleClick}>전송</button>
        </SendMessageBox>
      </ChattingBox>
    </ChattingWrap>
  );
};

export default Chatting;

const ChattingWrap = styled.div`
  width: 383px;
  height: 200px;
`;

const ChattingBox = styled.div`
  width: 100%;
  height: 100%;
`;

const Monitor = styled.div`
  height: 100%;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  overflow-y: scroll;
  div {
    margin: 5px 0 20px 0;
    span {
      padding: 1px 5px;
      ${({ theme }) => theme.border('3px', 'solid', '#dbe8ff', null, '5px')}
    }
  }
`;

const ChatNav = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  ${({ theme }) => theme.flex(null, 'center')};
  span {
    font-weight: 700;
  }
`;

const SendMessageBox = styled.div`
  border-bottom: 1px solid lightgray;
  input {
    width: 80%;
    height: 30px;
    padding: 5px;
    font-size: 15px;
  }
  button {
    cursor: pointer;
    width: 20%;
    height: 30px;
    font-size: 15px;
    :hover {
      background-color: lightgray;
    }
  }
`;
