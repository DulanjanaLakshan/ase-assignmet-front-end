import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import Navbar from "../../components/navbar/Navbar";
import BackButton from "../../components/back/BackButton";
import { useNavigation } from "@react-navigation/native";

const BlogPost = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

  useEffect(() => {
    if (!navigation) {
      console.error("Navigation object not available in BlogPost component.");
    }
  }, []);

  return (
    <>
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
        />
        <TextInput
          className="p-2 w-full"
          placeholder="Enter your blog description"
          multiline={true}
        />
        <View className="absolute top-2 left-2 z-[999] flex gap-3 flex-row justify-center items-center">
          <TouchableOpacity
            id="uplode"
            className="w-10 h-10 rounded-full flex justify-center items-center bg-black"
            onPress={handleUploadPress}
          >
            <Image
              className="w-7 h-7"
              source={require("../../assets/icons/upload.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full flex justify-center items-center bg-black">
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
              className="w-32 bg-green-600 h-10 flec justify-center items-center rounded-lg"
              onPress={handleUplodeModal}
            >
              <Text style={styles.closeButtonText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
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
  modalInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
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
export default BlogPost;
