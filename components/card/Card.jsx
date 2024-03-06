import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Card = ({url,title,description,id}) => {
  const navigation = useNavigation();
  const [cachedId, setCachedId] = useState(null);

  const handleCardPress = () => {
    setCachedId(id);
    navigation.navigate("CardPrewive", { id,title,description,url });
  };

  return (
    <TouchableOpacity  onPress={handleCardPress} className="w-screen h-60 bg-black relative flex justify-end border border-gray-600">
      <Image
        source={{
          uri:url
        }}
        style={{ width: "100%", height: "100%" }}
        className="opacity-40 absolute"
      />
      <Text className="text-4xl text-white pl-2 pr-2 ">{title}</Text>
      <Text className="text-sm text-gray-200 pl-2 pr-2 pb-2">
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
