import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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

const CREATE_SIGN_UP = gql`
  mutation MUTATE_DATA(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ){
    signUp(
      createUserInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
      password
      username
      createdAt
      updatedAt
    }
  }
`;

const SignUp = () => {
  const navigation = useNavigation();
  const [firstname, setFirstName] = useState("");
  const [lastename, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [
    createSignUp,
    {
      loading: createSignUpLoading,
      error: createSignUpError,
      data: createSignUpData,
    },
  ] = useMutation(CREATE_SIGN_UP);
  
  const handlePostSubmit = async () => {
    try {
      const { data } = await createSignUp({
        variables: {
          firstName: firstname,
          lastName: lastename,
          email: email,
          username: username,
          password: password,
        },
      });
      if (data !== null) {
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.navigate("Home");
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errors = error.graphQLErrors.map((error) => error.message);
        console.error("GraphQL errors:", errors);
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
              Sign Up
            </Animated.Text>
          </View>
          <View className="flex items-center mx-4 space-y-4">
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="w-full flex-row justify-between"
            >
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl w-[49%] border border-gray-800"
                placeholder="First Name"
                value={firstname}
                onChangeText={(text) => setFirstName(text)}
                placeholderTextColor={"white"}
              />
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl w-[49%] border border-gray-800"
                placeholder="Last Name"
                value={lastename}
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor={"white"}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="w-full"
            >
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl w-full border border-gray-800"
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={"white"}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="w-full mb-3"
            >
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl w-full border border-gray-800"
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholderTextColor={"white"}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="w-full mb-3"
            >
              <TextInput
                className="text-white bg-black/50 p-5 rounded-2xl w-full border border-gray-800"
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"white"}
                secureTextEntry
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity onPress={handlePostSubmit} className="w-full bg-green-500 p-3 rounded-2xl mb-3">
                <Text className="text-xl font-bold text-white text-center">
                  SignUp
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text className="text-white pr-2">Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-sky-600">Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
