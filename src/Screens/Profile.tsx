import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, Image, View } from 'react-native';
import styled from 'styled-components/native';

// Import the Post component
import Post from '../Components/Post';

type RootStackParamList = {
    Profile: undefined;
};

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

// Define styled components
const Container = styled.View`
  align-items: center;
  margin: 10px;
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const Heading = styled.Text`
  font-size: 24px;
  margin: 10px;
  color: #333;
`;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <ScrollView>
      <Container>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Name>Dinesh Karthik</Name>
        <Description>Work: Software Engineer</Description>
        <Description>School: Georgin College</Description>
        <Description>Lives in: Totonto</Description>
        <Description>From: Los Angeles</Description>
      </Container>
      <View>
        <Heading>Posts</Heading>
        {/* From DB */}
        <Post title="First Post" content="This is the content of the first post" image={require('../../assets/logo.png')} />
        <Post title="Second Post" content="This is the content of the second post" image={require('../../assets/logo.png')} /> 
        <Post title="Third Post" content="This is the content of the third post" image={require('../../assets/logo.png')} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
