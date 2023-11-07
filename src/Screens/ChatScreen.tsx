import React from 'react'
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Components/Header';
import Chat from '../Components/MessageSection';
import SearchComponent from '../Components/Search';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

 const ChatScreen = () => {
  return (
    <Container>
      <Header headerTitle='Messages' iconName = "create-outline" />
      <SearchComponent></SearchComponent>
     <Chat name='Floyd Miles' message ="Okay, bye" />
     <Chat name='Robert Fox'  message ="See you soon"/>
     <Chat name='Cody Fisher' message ="Hey there"/>
     <Chat name='Jacob Jones' message ="Yes, thanks!"/>

  </Container>
  )
}

export default ChatScreen