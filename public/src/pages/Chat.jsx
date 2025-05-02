import React, { useState } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useNavigate } from 'react-router-dom';

function Chat() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {

      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser])

  return(
  <Container>
    <div className="container">
      <ChatContainer />
    </div>
  </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      width: 90vw;
    }
  }
`;


export default Chat