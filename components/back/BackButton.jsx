import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View className="w-screen flex justify-end items-end pt-1 absolute top-20 z-[900]">
      <TouchableOpacity onPress={() => navigation.goBack()} className="w-12 h-16 bg-black rounded-l-full flex justify-center items-center">
        <Image
          className="w-7 h-7"
          source={require("../../assets/icons/back.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
