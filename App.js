import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login/Login';
import SignUp from './screens/signup/SignUp';
import Home from './screens/home/Home';
import CardPrewive from './components/card/CardPrewive';
import BlogPost from './screens/post/BlogPost';
import { ApolloProvider } from '@apollo/client';
import client from './client/apollo';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CardPrewive" component={CardPrewive} />
        <Stack.Screen name="BlogPost" component={BlogPost} />
      </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  )
}

export default App