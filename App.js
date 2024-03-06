import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login/Login';
import SignUp from './screens/signup/SignUp';
import Home from './screens/home/Home';
import CardPrewive from './components/card/CardPrewive';
import BlogPost from './screens/post/BlogPost';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CardPrewive" component={CardPrewive} />
        <Stack.Screen name="BlogPost" component={BlogPost} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App