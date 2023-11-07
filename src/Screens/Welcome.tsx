import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import Post from '../Components/Post';
import NewPost from '../Components/NewPost';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Messages: undefined;
  Welcome: undefined;
  Profile: undefined;
};

type WelcomeScreenProps = StackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({ navigation }: WelcomeScreenProps) => {
  const [userDetails, setUserDetails] = useState<{ userId: string, token: string }>({ userId: '', token: '' });
  const [posts, setPosts] = useState<Array<{
    _id: string,
    title: string,
    content: string,
    createdAt: string,
    likes: string[],
    comments: string[],
    image?: string,
    user: string;
  }>>([]);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      const fetchToken = async () => {
          const storedData = await AsyncStorage.getItem('data');
          if (storedData) {
              const data = JSON.parse(storedData);
              setToken(data.token);
          }
      };
      fetchToken();
  }, []);  

  useEffect(() => {
    if (token) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      axios.get('https://itribez-node-apis.onrender.com/post/posts', { headers })
        .then((response) => {
          setPosts(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [token]);
  
  return (
    <ScrollView>
      <NewPost />
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          likes={post.likes || []} 
          comments={post.comments}
          image={post.image}
          user={Object.prototype.hasOwnProperty.call(post, 'user') && post.user !== undefined && post.user !== null && post.user !== "" ? post.user : "Unknown User"}
        />
      ))}
    </ScrollView>
  );
};

export default Welcome;
