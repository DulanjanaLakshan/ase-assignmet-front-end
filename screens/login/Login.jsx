import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StatusBar,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Animated,{FadeIn,FadeInDown,FadeInUp,FadeOut} from "react-native-reanimated";

const Login = () => {
    const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View className="bg-black h-full w-full">
        <StatusBar style="light"/>
        <Image className="h-full w-full absolute opacity-40" source={require('../../assets/images/gym.jpg')}/>

        <View className="w-full h-full flex justify-around pt-40 pb-10">
            <View className="flex items-center">
                <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} className="text-white font-bold tracking-wider text-5xl">
                    Login
                </Animated.Text>
            </View>
            <View className="flex items-center mx-4 space-y-4">
                <Animated.View entering={FadeInDown.duration(1000).springify()} className="w-full">
                    <TextInput className="text-white bg-black/50 p-5 rounded-2xl border border-gray-800" placeholder="Username" placeholderTextColor={"white"}/>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}  className="w-full mb-3">
                    <TextInput className="text-white bg-black/50 p-5 rounded-2xl border border-gray-800" placeholder="Password" placeholderTextColor={"white"} secureTextEntry/>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}  className="w-full">
                    <TouchableOpacity className="w-full bg-green-500 p-3 rounded-2xl mb-3"  onPress={() => navigation.navigate("Home")}>
                        <Text className="text-xl font-bold text-white text-center">Login</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}  className="flex-row justify-center">
                    <Text className="text-white pr-2">Don't have an account?</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate("SignUp")}>
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
