import React from 'react'
import { View ,StyleSheet ,Text} from 'react-native'
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 50px;
  padding-horizontal: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:30px;
`;

const NotiContainer = styled.View`

`;

const Image = styled.Image`

`;

const IconButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-top:10px;
  border-radius: 30px;
  background: #70757a;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;



const TextContainer = styled.View`
margin-right:30px;
`;
const Title = styled .Text`
fontWeight:400;
fontSize:20px;
paddingBottom: 5px
`;
const TitleSmall = styled .Text`
fontWeight:100;
fontSize:14px;
`;

const ButtonText = styled.Text`
fontSize : 16px;
fontWeight:300;
textAlign:center;
`;

const Button = styled.Pressable`
broder: 2px solid blue;
width :70px;
height:25px;
textAlign:center;
backgroundColor:transparent;
borderRadius:30px;
border:2px solid gray;
marginRight: 20px
`;
const Line  = styled.View`
text-align:center;
align-items:center;
border-bottom-color: #acb3b9bd;
border-bottom-width: 1px;
height:10px;
width:80%;
margin-left:40px;
padding:10px;
`

; 

const NotificationSection = () => {
  return (
    <>
   <Container>

    
<IconButton>
</IconButton>

<TextContainer>
    <Title>Floyed Miles</Title>
    <TitleSmall>Started Following you</TitleSmall>
</TextContainer>

<Button>
<ButtonText>Follow</ButtonText></Button>

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
  

export default NotificationSection
