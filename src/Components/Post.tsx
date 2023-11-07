import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image, ImageSourcePropType, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostContainer = styled.View`
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f2f2f2;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const PostContent = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  margin-top: 10px;
`;

const ActionBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ActionText = styled.Text`
  margin-left: 5px;
  font-size: 14px;
`;

const CommentsButton = styled.TouchableOpacity`
  margin-top: 10px;
  align-self: flex-start;
`;

const CommentsButtonText = styled.Text`
  color: black;
  font-size: 16px;
`;

type Comment = {
  id: string;
  text: string;
  image?: ImageSourcePropType;
};

type PostProps = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  likes: string[];
  comments: Comment[]; // Comments type is changed
  image?: string;
  user: string;
};

const Post = ({ _id, title, content, image, comments, likes, user }: PostProps) => {
  const [commentText, setCommentText] = useState('');
  const currentUserLiked = likes?.includes(user);
  const [liked, setLiked] = useState(currentUserLiked);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isCommentsModalVisible, setCommentsModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<{ userId: string, token: string }>({ userId: '', token: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('data');
      if (data !== null) {
        setUserDetails(JSON.parse(data));
      }
    };
    fetchData();
  }, []);

  const header = {
    headers: {
      'Authorization': `Bearer ${userDetails.token}`
    }
  };

  const getCommentsByPost = async () => {
    try {
      const response = await axios.get(`https://itribez-node-apis.onrender.com/post/${_id}/comments`, header);
      if (response.status === 200) {
        setCommentText(response.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const likePost = async (postId: string) => {
    try {
      const response = await axios.put(`https://itribez-node-apis.onrender.com/post/${postId}/like`, null, header);
      if (response.status === 200) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      const response = await axios.put(`https://itribez-node-apis.onrender.com/post/${postId}/unlike`, null, header);
      if (response.status === 200) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  };

  const createComment = async (commentText: string) => {
    try {
      const response = await axios.post('https://itribez-node-apis.onrender.com/create', { text: commentText, postId: _id }, header);
      if (response.status === 200) {
        // Comment successfully created, you can handle this as needed.
        getCommentsByPost(); // Refresh the comments list
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleLikeClick = () => {
    if (liked) {
      unlikePost(_id);
    } else {
      likePost(_id);
    }
  };

  const toggleCommentsModal = () => {
    setCommentsModalVisible(!isCommentsModalVisible);
    if (!isCommentsModalVisible) {
      getCommentsByPost(); // Fetch comments when opening the modal
    }
  };

  return (
    <PostContainer>
      <View>
        <PostContainer>
          <PostTitle>{title}</PostTitle>
          <PostContent>{content}</PostContent>
          {image && <PostImage source={{ uri: image }} />}
          <ActionBar>
            <ActionButton onPress={handleLikeClick}>
              <MaterialIcons
                name='thumb-up'
                size={24}
                color={liked ? 'blue' : 'black'}
              />
              <ActionText>Like ({likeCount})</ActionText>
            </ActionButton>
            <ActionButton onPress={toggleCommentsModal}>
              <MaterialIcons name="comment" size={24} color="black" />
              <ActionText>Comment</ActionText>
            </ActionButton>
          </ActionBar>
        </PostContainer>

        <Modal
          isVisible={isCommentsModalVisible}
          onBackdropPress={toggleCommentsModal}
          style={{ margin: 0, justifyContent: 'flex-end' }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: 500,
              flexDirection: 'column',
            }}
          >
            <ScrollView>
              {comments && comments.map((comment) => (
                <View style={{ borderBottomWidth: 0.5, borderColor: 'grey', width: '90%', marginLeft: 30 }}>
                  <View key={comment.id} style={{ marginBottom: 10, flexDirection: "row" }}>
                    {comment.image && (
                      <Image
                        style={{
                          width: 70,
                          height: 40,
                          marginTop: 10,
                          borderRadius: 100,
                          marginLeft: -20
                        }}
                        source={comment.image}
                      />
                    )}
                    {comment.text && <Text style={{ margin: 20 }}>{comment.text}</Text>}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Add a text input and submit button for adding comments */}
            <TextInput
              placeholder="Add a comment"
              onChangeText={(text) => setCommentText(text)}
              value={commentText}
            />
            <TouchableOpacity onPress={() => createComment(commentText)}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </PostContainer>
  );
};

export default Post;
