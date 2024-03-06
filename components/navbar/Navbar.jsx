import { useNavigation } from "@react-navigation/native";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Navbar = () => {
    const navigation = useNavigation();
  return (
    <View className="flex flex-row w-full justify-between items-center p-5 bg-black">
      <TouchableOpacity  onPress={() => navigation.navigate("BlogPost")}>
        <Image
          className="w-7 h-7"
          source={require("../../assets/icons/create.png")}
        />
      </TouchableOpacity>
      <View className="flex flex-row border justify-between items-center border-gray-400 w-[60%] rounded-xl pl-2 pr-2">
        <TextInput placeholder="Search Blog..." placeholderTextColor={"gray"} />
        <TouchableOpacity>
          <Image
          className="w-4 h-4"
          source={require("../../assets/icons/search.png")}
        />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          className="w-7 h-7"
          source={require("../../assets/icons/user.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
