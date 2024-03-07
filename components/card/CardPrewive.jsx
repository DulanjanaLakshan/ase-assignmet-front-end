import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../back/BackButton";
import Navbar from "../navbar/Navbar";
import { gql, useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GET_ALL_BLOG_POSTS_COMMENT = gql`
  query QUERY_DATA($blogId: String!) {
    findCommentByPostId(blogId: $blogId) {
      id
      comment
      author
      blogId
      createdAt
      updatedAt
    }
  }
`;
const CREATE_BLOG_POSTS_COMMENT = gql`
  mutation MUTATE_DATA($comment: String!, $author: String!, $blogId: String!) {
    createComment(
      createCommentInput: {
        comment: $comment
        author: $author
        blogId: $blogId
      }
    ) {
      id
      comment
      author
      blogId
      createdAt
      updatedAt
    }
  }
`;

const CardPrewive = ({ route }) => {
  const { id, title, description, url } = route.params; // Access the passed ID
  const [details, setDetails] = useState([]);
  const [comment, setComment] = useState([]);
  const [author, setAuthor] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS_COMMENT, {
    variables: { blogId: id },
  });

  const [
    createBlogComment,
    {
      loading: createBlogCommentLoading,
      error: createBlogCommentError,
      data: createBlogCommentData,
    },
  ] = useMutation(CREATE_BLOG_POSTS_COMMENT, {
    variables: {
      blogId: id,
      author: author,
      comment: comment,
    },
  });

  const handleCommentSubmit = async () => {
    try {
      const { data } = await createBlogComment();
      setComment("");
    } catch (error) {
      console.error("Error creating blog comment:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData !== null) {
          const userDataObject = JSON.parse(userData);
          setAuthor(userDataObject.signIn.id);
        }
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    if (data) {
      setDetails(data.findCommentByPostId);
    }
  }, [data]);

  const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      paddingBottom: 69,
    },
  });

  return (
    <>
      <Navbar />
      <BackButton />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View className="h-full w-full ">
            <Image
              source={{
                uri: url,
              }}
              className="w-full h-96 "
            />
            <Text className="text-4xl pt-5 pl-2 pr-2 pb-5">{title}</Text>
            <Text className="pl-2 pr-2 text-gray-700">{description}</Text>
            <View className="w-full flex items-center ">
              <View className="w-[96%] mt-7 mb-5 pr-10 flex flex-row items-center border-b">
                <TextInput
                  className="w-full h-14 p-2"
                  placeholder="Enter your comment"
                  placeholderTextColor={"gray"}
                  onChangeText={(text) => setComment(text)}
                />
                <TouchableOpacity onPress={handleCommentSubmit}>
                  <Image
                    className="w-4 h-4"
                    source={require("../../assets/icons/send.png")}
                  />
                </TouchableOpacity>
              </View>
              <View className="w-full flex gap-3 justify-center h-auto">
                {details.map((item) => {
                  return (
                    <View key={item.id} className="flex flex-row items-center gap-2 p-3 border border-gray-300 rounded-2xl">
                      <View className="bg-black w-7 h-7 flex justify-center items-center rounded-full">
                        <Image
                          source={{
                            uri:
                              "https://www.next.us/nxtcms/resource/blob/5791594/0b81a7d7db30a12f5494cbc97b53c573/knitwear-data.jpg",
                          }}
                          className="w-full h-full rounded-full border"
                        />
                      </View>
                      <Text>{item.comment}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CardPrewive;
