import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import Navbar from "../../components/navbar/Navbar";
import BackButton from "../../components/back/BackButton";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CREATE_BLOG_POST = gql`
  mutation MUTATE_DATA(
    $title: String!
    $body: String!
    $image: String!
    $author: String!
  ) {
    createBlogPost(
      createBlogPostInput: {
        title: $title
        body: $body
        image: $image
        author: $author
      }
    ) {
      id
      title
      body
      image
      author
      createdAt
      updatedAt
    }
  }
`;

const BlogPost = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [
    createBlogPost,
    {
      loading: createBlogLoading,
      error: createBlogError,
      data: createBlogData,
    },
  ] = useMutation(CREATE_BLOG_POST, {
    variables: {
      title: title,
      body: body,
      image: imageUrl,
      author: author,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData !== null) {
          const userDataObject = JSON.parse(userData);
          setAuthor(userDataObject.signIn.id);
          console.log(userDataObject.signIn.id);
        }
        navigation.navigate("Home");
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUploadPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setImageUrl("");
  };

  const handleInputChange = (text) => {
    setImageUrl(text);
  };

  const handleUplodeModal = () => {
    setIsModalVisible(false);
  };

  const handlePostSubmit = async () => {
    try {
      const { data } = await createBlogPost();
      navigation.navigate("Home");
    } catch (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errors = error.graphQLErrors.map((error) => error.message);
      }
    }
  };

  const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      paddingBottom: 69,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: "gray",
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: "white",
      textAlign: "center",
    },
  });
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Navbar />
        <BackButton />

        <View className="w-screen h-auto relative">
          {imageUrl !== "" && (
            <Image source={{ uri: imageUrl }} className="w-full h-96" />
          )}
          <TextInput
            placeholder="Title..."
            placeholderTextColor={"gray"}
            style={{ fontSize: 46 }}
            className="p-2 w-screen h-40 bg-gray-300"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            className="p-2 w-full"
            placeholder="Enter your blog description"
            multiline={true}
            onChangeText={(text) => setBody(text)}
          />
          <View className="absolute top-2 left-2 z-[999] flex gap-3 flex-row justify-center items-center">
            <TouchableOpacity
              id="upload"
              className="w-10 h-10 rounded-full flex justify-center items-center bg-black"
              onPress={handleUploadPress}
            >
              <Image
                className="w-7 h-7"
                source={require("../../assets/icons/upload.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 rounded-full flex justify-center items-center bg-black"
              onPress={handlePostSubmit}
            >
              <Image
                className="w-7 h-7"
                source={require("../../assets/icons/send1.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
          className="w-full h-screen flex justify-center"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Image URL</Text>
            <TextInput
              className="w-full h-14 border border-gray-400 m-2 p-2 rounded-2xl"
              value={imageUrl}
              onChangeText={handleInputChange}
              placeholder="Type here..."
            />
            <View className="w-full flex flex-row justify-center items-center gap-4">
              <TouchableOpacity
                className="w-32 bg-green-600 h-10 flex justify-center items-center rounded-lg"
                onPress={handleUplodeModal}
              >
                <Text style={styles.closeButtonText}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default BlogPost;
