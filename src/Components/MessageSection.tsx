import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 30px;
  padding-horizontal: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:30px;
`;

const NotiContainer = styled.View`

`;

const Image = styled.Image`
 margin-bottom: 20px;
`;

const IconButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-top:2px;
  border-radius: 30px;
  background: #70757a;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;



const TextContainer = styled.View`
margin-right:100px;

`;
const Title = styled.Text`
fontWeight:400;
fontSize:20px;
`;
const TitleSmall = styled.Text`
fontWeight:200;
fontSize:13px;
`;

const ButtonText = styled.Text`
fontSize : 16px;
fontWeight:300;
textAlign:center;
`;

const Button = styled.Pressable`
broder: 2px solid blue;
width :100px;
height:30px;
textAlign:center;
backgroundColor:transparent;
borderRadius:30px;
border:2px solid gray;
`;
const Line = styled.View`
text-align:center;
align-items:center;
border-bottom-color: #acb3b9bd;
border-bottom-width: 1px;
height:10px;
width:90%;
margin-left:20px;
padding:10px;
`;

interface ChatProps {
  name: string;
  message: string;
}

const Chat: React.FC<ChatProps> = ({ name, message }) => {
  return (
    <>
      <Container>
        <IconButton>
        </IconButton>
        <TextContainer>
          <Title>{name}</Title>
          <TitleSmall>{message}</TitleSmall>
        </TextContainer>
        <TitleSmall>20 min ago</TitleSmall>
      </Container>
      <Line></Line>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default Chat
