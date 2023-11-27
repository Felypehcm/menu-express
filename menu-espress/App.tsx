import  Batata  from 'react-native-vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import login from './src/pages/login/Login';
import CreateAccount from './src/pages/createAccount/CreateAccount';
import Home from './src/pages/home/Home';
import ForgotPassword from './src/pages/forgotPassword/ForgotPassword';
import ShoppingCart from './src/pages/shoppingCart/ShoppingCart';
import { useState } from 'react';
import Favorites from './src/pages/favorites/Favorites';
import Login from './src/pages/login/Login';
import { Header } from 'react-native-elements';


const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator()
  const [shoppingCart, setShoppingCart] = useState([])
  const [favorites, setFavorites] = useState([])
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} ></Stack.Screen>
        <Stack.Screen  options={{headerShown: false}} name="login" component={login}></Stack.Screen>
        <Stack.Screen  options={{title: 'Criar Usuario', headerTintColor: '#000', headerShown: false}} name="createAccount" component={CreateAccount}></Stack.Screen>
        <Stack.Screen options={{title: 'Recuperar Senha', headerTintColor: '#000', headerShown: false}} name="forgotPassword" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen options={({navigation}) => {
          return {
            title: 'Lanches',
            headerBackVisible: false,
              headerTitleAlign: 'center', 
              headerRight: () => (<Batata onPress={()=> (navigation.navigate('ShoppingCart', {shoppingCart}))} name="shoppingcart" size={25}></Batata>),
              headerLeft: () => (<Batata onPress={()=> (navigation.navigate('login'))} name="logout" size={25}></Batata>)
            }
        }} name="Home">
          {
            () => (
              <Home shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} favotites={favorites} setFavorite={setFavorites} ></Home>
            )
          }
        </Stack.Screen>
        <Stack.Screen name="ShoppingCart" component={ShoppingCart}></Stack.Screen>
        <Stack.Screen name="Favorites" options={{headerShown: false}}>
        {
            () => (<Favorites favorites={favorites} setFavorites={setFavorites}></Favorites>)
        }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App