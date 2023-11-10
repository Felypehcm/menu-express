import  Batata  from 'react-native-vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import login from './src/pages/login/Login';
import CreateAccount from './src/pages/createAccount/CreateAccount';
import Home from './src/pages/home/Home';
import ForgotPassword from './src/pages/forgotPassword/ForgotPassword';


const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{headerShown: false}} name="login" component={login}></Stack.Screen>
        <Stack.Screen options={{title: 'Criar Usuario', headerTintColor: '#000'}} name="createAccount" component={CreateAccount}></Stack.Screen>
        <Stack.Screen options={{title: 'Recuperar Senha', headerTintColor: '#000'}} name="forgotPassword" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen options={{
          title: 'Lanches',
           headerBackVisible: false,
            headerTitleAlign: 'center', 
            headerRight: () => (<Batata name="shoppingcart" size={25}></Batata>),
            headerLeft: () => (<Batata name="login" size={25}></Batata>)
            }} name="home" component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App