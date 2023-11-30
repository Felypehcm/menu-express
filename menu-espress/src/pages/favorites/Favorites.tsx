import React from 'react'
import { Text, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingCart from '../shoppingCart/ShoppingCart';


const Favorites = ({favorites, setFavorites}: any) => {
  return (
<View style={{flexDirection:'row', borderRadius: 50, justifyContent: 'space-between', marginHorizontal: 45, marginVertical: 20}}>
    <Pressable style={{backgroundColor:'#fb4e30',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:50}}><Icon name="home" size={30} color="white"></Icon></Pressable>

    <Pressable onPress={()=> (navigation.navigate('ShoppingCart', {shoppingCart}))} style={{backgroundColor:'#fb4e30',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:50}}><Icon name="shoppingcart" size={30} color="white"></Icon></Pressable>

    <Pressable style={{backgroundColor:'#fb4e30',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50}}><Icon name="heart" size={30} color="white"></Icon></Pressable>

    <Pressable style={{backgroundColor:'#fb4e30',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50}}><Icon name="profile" size={30} color="white"/></Pressable>
</View>
  )
}


export default Favorites