import React from 'react'
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Components/Header';
import NotificationSection from '../Components/NotificationSection';
import { ScrollView } from 'react-native-gesture-handler';
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

 const Notification = () => {
  return (
    <Container>
      <Header headerTitle='Notification' iconName="search" />
      <ScrollView>
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      <NotificationSection />
      </ScrollView>
  </Container>
  )
}


export default Notification