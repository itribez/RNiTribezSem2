import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Post from '../Components/Post';
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
    <View style={{ flex: 1, backgroundColor: '#ffff'}}>
      <View style={{ flexDirection: 'row', paddingTop: 20 }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 35, height: 35, margin: 20 }}
        />
        <Text style={{
          padding: 25,
          fontWeight: '700',
          fontSize: 18,
          textAlign: 'left',
          color: 'blue',
          marginLeft: -40
        }}>
          itribez
        </Text>
      </View>
      <ScrollView>
        {posts.map((post) => (
          <View key={post._id} style={{ backgroundColor: 'white', margin: 20, marginTop: -15, borderRadius: 10, overflow: 'hidden' }}>
            
            <Post
              _id={post._id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              likes={post.likes || []}
              comments={post.comments}
              image={post.image}
              user={Object.prototype.hasOwnProperty.call(post, 'user') && post.user !== undefined && post.user !== null && post.user !== "" ? post.user : "Unknown User"}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Welcome;
