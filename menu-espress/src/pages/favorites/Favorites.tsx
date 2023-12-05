import React from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


const Favorites = ({ favorites, setFavorites, ShoppingCart, Home, Orders }: any) => {

  const navigation = useNavigation();

  return (
    <>
    <ScrollView>
    {favorites.map((prod: any, i: number) => (
        
          <Card key={i}>
            <Card.Title style={{ fontSize: 22 }}> {prod.name} </Card.Title>
            <Card.Divider />
            <Card.Image source={{ uri: prod.image }} />
            <View style={{ alignItems: 'center' }}>
            </View>
          </Card>
        
    ))}
    </ScrollView>
    
    <View style={{position:'absolute', bottom: 0}}>
      <View style={{flexDirection:'row', borderRadius: 50, justifyContent: 'space-between', marginHorizontal: 50, marginVertical: 20}}>
          <Pressable onPress={()=> (navigation.navigate('Home'))} style={{backgroundColor:'#fb4e30',
                          height: 50,
                          width: 50,
                          marginHorizontal:14,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius:50}}><Icon name="home" size={30} color="white"></Icon></Pressable>

          <Pressable  onPress={()=> (navigation.navigate('ShoppingCart', {shoppingCart}))} style={{backgroundColor:'#fb4e30',
                          height: 50,
                          width: 50,
                          marginHorizontal:14,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius:50}}><Icon name="shoppingcart" size={30} color="white"></Icon></Pressable>

          <Pressable style={{backgroundColor:'#fb4e30',
                          height: 50,
                          width: 50,
                          marginHorizontal:14,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50}}><Icon name="heart" size={30} color="white"></Icon></Pressable>

          <Pressable onPress={()=> (navigation.navigate('Orders', {Orders}))} style={{backgroundColor:'#fb4e30',
                          height: 50,
                          width: 50,
                          marginHorizontal:14,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50}}><Icon name="profile" size={30} color="white"/></Pressable>
      </View>
    </View>
    </>
  )
}
export default Favorites
