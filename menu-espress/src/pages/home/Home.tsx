import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import React from 'react'
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements'
import {FAB} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'
import Style from './HomeStyle'
import Toast from 'react-native-toast-message';
import httpService from '../../httpService'

const Home = ({navigation, shoppingCart, setShoppingCart, favorites, setFavorites, orders}: any) => {
  
  const openToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message
    });
  }

  const remuveFavorite = (product: any) => {
    const filteredFavorites = favorites.filter((favorite: any) => {
      return favorite.name !== product.name
    })
    setFavorites(filteredFavorites)
  }

  const openChat = () => {
    navigation.navigate('Chat')
  }

  const [ lanchesHome, setLanchesHome ] = useState([]);

  useEffect(() => {
    const lanches = async () => {
      try{
        const response = await fetch('http://192.168.0.13:8080/api/product/findByType/Lanche');
        const data = await response.json();
        setLanchesHome(data);
      } catch (error) {
        console.log('Não foi possível exibir os itens ={', error);
      }
    };
    lanches();
  }, []);

  return (
    <>
      {/* <ScrollView> */}
          <StatusBar backgroundColor='black'/>
            <View style={{paddingHorizontal: 20, backgroundColor: '#fb4e30', marginHorizontal: 15, justifyContent:'center', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 24, fontWeight: '700'}}>Sanduiches</Text>
            </View>
            <FlatList
                data={lanchesHome}
                keyExtractor={(item: any) => item._id.toString()}
                renderItem={({ item }) => (        
                  <Card key={item}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{width: 120, height: 120}}>
                        <Card.Image source={{uri: item.imageUrl, width: 60, height: 60}}/>
                      </View>
                      <View style={{margin: 15, width: 200, height: 120, justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, marginBottom: "3%", marginTop: -15, fontWeight:'bold'}}> {item.name} </Text>
                        <Card.Divider/>
                        <Text style={{fontSize: 12, paddingBottom: 25}}> Descrição: {item.description} </Text>
                        <Text style={{fontSize: 16, marginEnd: "5%", marginBottom: "3%", marginTop: "2%"}}> Preço: R$ {item.price.toFixed(2)} </Text>
                        <View style={{flexDirection:'row', justifyContent: 'space-between', paddingRight: 10}}>
                          <Pressable onPress={() => {
                            openToast("Item adicionado com sucesso!");
                            item.quantity+=1;
                            const existingProduct = shoppingCart.find((item: any) => item.name === item.name);
                            const emptyProduct = shoppingCart.find((item: any) => item.quantity <= 0);
                            if (!existingProduct && !emptyProduct){
                              setShoppingCart([...shoppingCart, item])
                            }
                            if (emptyProduct){
                              const notEmptyProducts = shoppingCart.filter((item: any) => item.quantity > 0);
                              setShoppingCart(notEmptyProducts)
                            }
                            }}
                            style={
                            ({pressed}:any) => (
                              {
                                backgroundColor: pressed ? '#2089dc' : '#fb4e30',
                                height: 32,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 8,
                                paddingHorizontal: 10
                              }
                            )
                            }>
                            <Text style={{fontSize: 14, color: 'white'}}>Adicionar</Text>
                          </Pressable>
                          {
                            // FAVORITE
                            item ? 
                            <Icon onPress={() => {remuveFavorite(item), setFavorites(false)}} name="heart" size={28} color="red"></Icon>:
                            <Icon onPress={() => {                      
                              if(favorites) {setFavorites([...favorites, item])
                              } else {
                                setFavorites([item])
                              }
                              setFavorites(true)
                            }} name="hearto" size={28}></Icon>
                          }
                        </View>
                      </View>
                    </View>
                  </Card>   
                )}
              />
      <FAB
        style={Style.fab}
        visible= {true}
        icon={{name:'chat', color:'white'}}
        color="green"
        onPress={() => openChat()}
      />
      <View style={{flexDirection:'row', borderRadius: 50,  justifyContent: 'space-between', marginHorizontal: 45, marginVertical: 20}}>
        <Pressable style={{backgroundColor:'#fb4e30', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius:50}}>
          <Icon name="home" size={30} color="white"></Icon>
        </Pressable>

        <Pressable onPress={()=> (navigation.navigate('ShoppingCart', {shoppingCart}))} style={{backgroundColor:'#fb4e30', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius:50}}>
            <Icon name="shoppingcart" size={30} color="white"></Icon>
        </Pressable>

        <Pressable onPress={()=> (navigation.navigate('Favorites', {favorites}))} style={{backgroundColor:'#fb4e30', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
          <Icon name="heart" size={30} color="white"></Icon>
        </Pressable>

        <Pressable onPress={()=> (navigation.navigate('Orders', {orders}))} style={{backgroundColor:'#fb4e30', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
          <Icon name="profile" size={30} color="white"/>
        </Pressable>
      </View>
    </>
  );
};

export default Home