import login from './src/pages/login/Login';
import Login from './src/pages/login/Login';
import CreateAccount from './src/pages/createAccount/CreateAccount';
import ForgotPassword from './src/pages/forgotPassword/ForgotPassword';
import Home from './src/pages/home/Home';
import ShoppingCart from './src/pages/shoppingCart/ShoppingCart';
import Favorites from './src/pages/favorites/Favorites';
import Chat from './src/pages/Chat/chat';
import Profile from './src/pages/Profile/Profile';
import Orders from './src/pages/Orders/Orders';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import ProfileIcon from './src/pages/Profile/ProfileIcon';
import IconTop from './src/pages/Profile/ProfileIcon'


const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator()
  const [shoppingCart, setShoppingCart] = useState([])
  const [favorites, setFavorites] = useState([])
  
  return (
    <>
        <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} ></Stack.Screen>
        <Stack.Screen  options={{headerShown: false}} name="login" component={login}></Stack.Screen>
        <Stack.Screen  options={{title: 'Criar Usuario', headerTintColor: '#000', headerShown: false}} name="createAccount" component={CreateAccount}></Stack.Screen>
        <Stack.Screen options={{title: 'Recuperar Senha', headerTintColor: '#000', headerShown: false}} name="forgotPassword" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen options={({navigation}) => {
          return {
            title: 'Início',
            headerBackVisible: false,
            gestureEnabled: false,
              headerTitleAlign: 'center', 
              headerRight: () => <ProfileIcon navigation={navigation} />
            }
        }} name="Home">
          {
            ({navigation}) => (
              <Home navigation={navigation} 
              shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} 
              favorites={favorites} setFavorites={setFavorites}></Home>
            )
          }
        </Stack.Screen>
        <Stack.Screen name="Orders" options={{title: 'Orders'}}>
        {
            () => (<Orders shoppingCart={shoppingCart} favorites={favorites}></Orders>)
        }
        </Stack.Screen>
        <Stack.Screen name="Profile" component={Profile} options={{title: 'Perfil'}}></Stack.Screen>
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{title: 'Carrinho'}}></Stack.Screen>
        <Stack.Screen options={{headerTitleAlign: 'center'}} name="Chat" component={Chat}></Stack.Screen>
        <Stack.Screen options={{headerTitleAlign: 'center', title:'Favoritos'}} name="Favorites">
        {
            () => (<Favorites favorites={favorites} setFavorites={setFavorites} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}></Favorites>)
        }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  

      < Toast />
    </>
  );
}
export default App