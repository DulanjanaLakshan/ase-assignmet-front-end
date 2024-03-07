import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";

const CREATE_SING_IN = gql`
  mutation MUTATE_DATA(
    $email: String!
    $password: String!
  ){
    signIn(loginUserInput: { email: $email, password: $password }) {
      id
      firstName
      lastName
      email
      username
      createdAt
      updatedAt
    }
  }
`;
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    createSingIn,
    {
      loading: createSingInLoading,
      error: createSingInError,
      data: createSingInData,
    },
  ] = useMutation(CREATE_SING_IN, {
    variables: {
      email: email,
      password: password,
    },
  });

  const handleChange = async () => {
    try {
      const { data } = await createSingIn();
      if (data !== null) {
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        
        navigation.navigate("Home");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errors = error.graphQLErrors.map((error) => error.message);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View className="bg-black h-full w-full">
        <StatusBar style="light" />
        <Image
          className="h-full w-full absolute opacity-40"
          source={require("../../assets/images/gym.jpg")}
        />

        <View className="w-full h-full flex justify-around pt-40 pb-10">
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.delay(200)
                .duration(1000)
                .springify()
                .damping(3)}
              className="text-white font-bold tracking-wider text-5xl"
            >
              Login
            </Animated.Text>
          </View>
          <View className="flex items-center mx-4 space-y-4">
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="w-full"
            >
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl border border-gray-800"
                placeholder="Email"
                value={email}
                placeholderTextColor={"white"}
                onChangeText={(text) => setEmail(text)}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="w-full mb-3"
            >
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl border border-gray-800"
                placeholder="Password"
                value={password}
                placeholderTextColor={"white"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                className="w-full bg-green-500 p-3 rounded-2xl mb-3"
                onPress={handleChange}
              >
                <Text className="text-xl font-bold text-white text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text className="text-white pr-2">Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
