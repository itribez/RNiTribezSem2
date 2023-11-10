import React, { useState,useEffect } from 'react';
import { Button, TextInput,Text } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPostContainer = styled.View`
  padding: 15px;
  paddingTop: 50px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const PostText = styled.Text`
  padding: 25px;
  fontWeight: 700;
  fontSize: 25px;
  textAlign: center;
`;

const PostInput = styled.TextInput`
  border: 1px solid #fff;
  padding: 10px;
  margin-bottom: 10px;
  height: 100px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;
const PostTitle = styled.TextInput`
  border: 1px solid #fff;
  padding: 10px;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`
const ButtonPost = styled.Pressable`
  background-color: #000000;
  padding: 10px;
  marginTop:40px;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
const BtnText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Chat = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [userDetails, setUserDetails] = useState<{ userId: string,token : string }>({ userId: '',token : '' });
  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('data');
      if (data !== null) {
        console.log('Data: ajajaj ', data)
        setUserDetails(JSON.parse(data));
      }
    };
    fetchData();
  }, []);

  const submitPost = async () => {
    console.log('Submitting post...')
    try {
      const postData = { 
          "userId": userDetails.userId,
          "title": title,
          "content": content,
          "createdAt": new Date(),
      }
      const header = {
        headers: {
          'Authorization': `Bearer ${userDetails.token}`
        }
      }
      console.log('Post data:', postData)
      const response = await axios.post('https://itribez-node-apis.onrender.com/post/create', postData , header);
      const createdPost = response.data;
      console.log('Post created:', createdPost);
      setContent('');
      setTitle('');
    } catch (error: any) {
      console.error('Error creating post:', error.response.data);
    }
  };

  return (
    <NewPostContainer>
      <PostText>Create a Post</PostText>
      <PostTitle
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        multiline
        numberOfLines={1}
      />

      <PostInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />
      <ButtonPost onPress={submitPost}>
        <BtnText>Post</BtnText>
      </ButtonPost>
    </NewPostContainer>
  );
};

export default Chat;
