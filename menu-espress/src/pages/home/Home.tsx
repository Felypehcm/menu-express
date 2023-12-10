import { useEffect, useState } from 'react'
import React from 'react'
import { FlatList, Pressable, Text, View, Image } from 'react-native'
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-toast-message';
import httpService from '../../httpService'

import Style from './HomeStyle';

const Home = ({ navigation, shoppingCart, setShoppingCart, favorites, setFavorites, orders } : any) => {

  const [ lanchesHome, setLanchesHome ] = useState([]);
  const [ favorite, setFavorite ] = useState(false);

  const toggleFavorite = (product: any) => {
    const isFavorited = favorites.some((favItem: any) => favItem._id === product._id);

    if (isFavorited) {
      const filteredFavorites = favorites.filter((favItem: any) => favItem._id !== product._id);
      setFavorites(filteredFavorites);
    } else {
      setFavorites([...favorites, product]);
      ({ favorites: [...favorites, product] });
    }
  };  
  
  const openToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message
    });
  };

  const openChat = () => {
    navigation.navigate('Chat')
  };

  const removeFavorite = (product: any) => {
    const filteredFavorites = favorites.filter((favorite: any) => {
      return favorite.name !== product.name
    })
    setFavorites(filteredFavorites);
  };

  const lanches = async () => {
    try {
      const result: any = await httpService.getLancheHome();
      const data: any = await result.json();
      setLanchesHome(data);
      return data;
    } catch (error) {
      console.log('Não foi possível exibir os itens ={', error);
    }
  };

  useEffect(() => {
    const lanchesHomeTry: any = lanches();
    if (lanchesHomeTry.length) {
      setLanchesHome(lanchesHomeTry);
    };

  }, []);

  const renderItem = ({ item } : any) => (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#CCC'}}>
        <View style={{ width: 120, height: 120 }}>
          <Image source={{ uri: `data:image/jpeg;base64,${item.imageUrl}`, width: '100%', height: '100%' }} />
        </View>
        <View style={{ margin: 15, width: '65%', height: 120, justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 20, marginBottom: "3%", fontWeight: 'bold' }}> {item.name} </Text>
          <Text style={{ fontSize: 12}}> Descrição: {item.description} </Text>
          <Text style={{ fontSize: 16, marginEnd: "5%", marginBottom: "3%", marginTop: "2%" }}> Preço: R$ {item.price.toFixed(2)} </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            <Pressable onPress={() => {
              openToast("Item adicionado com sucesso!");
              item.descount += 1;
              const existingProduct = shoppingCart.find((item: any) => item.name === item.name);
              const emptyProduct = shoppingCart.find((item: any) => item.descount <= 0);
              if (!emptyProduct) {
                setShoppingCart([...shoppingCart, item])
              };
              if (emptyProduct) {
                const notEmptyProducts = shoppingCart.filter((item: any) => item.descount > 0);
                setShoppingCart(notEmptyProducts)
              };
              }}style={({ pressed }: any) => ({backgroundColor: pressed ? '#2089dc' : '#fb4e30', height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingHorizontal: 10})}>
              <Text style={{ fontSize: 14, color: 'white' }}>Adicionar</Text>
            </Pressable>
            
            <Icon
                name={favorites.some((favItem: any) => favItem._id === item._id) ? "heart" : "hearto"}
                size={28}
                onPress={() => toggleFavorite(item)}
                color={favorites.some((favItem: any) => favItem._id === item._id) ? "red" : "black"}
            />
          </View>
        </View>
      </View>
    </>
  );

  return (
    <>
      <View style={{height: '90%'}}>
        <FlatList
          data={lanchesHome}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id}
        />
      </View>

      <FAB style={Style.fab} visible={true} icon={{ name: 'chat', color: 'white' }} color="green" onPress={() => openChat()} />

      <View style={{position:'absolute', bottom: 0}}>
        <View style={{flexDirection:'row', borderRadius: 50, justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 20}}>
          <Pressable style={{ backgroundColor: '#fb4e30', height: 50, width: 50, marginHorizontal:14, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
            <Icon name="home" size={30} color="white"></Icon>
          </Pressable>

          <Pressable onPress={() => (navigation.navigate('ShoppingCart', { shoppingCart }))} style={{ backgroundColor: '#fb4e30', height: 50, width: 50, marginHorizontal:14, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
            <Icon name="shoppingcart" size={30} color="white"></Icon>
          </Pressable>

          <Pressable onPress={() => (navigation.navigate('Favorites', { favorites }))} style={{ backgroundColor: '#fb4e30', height: 50, width: 50, marginHorizontal:14, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
            <Icon name="heart" size={30} color="white"></Icon>
          </Pressable>

          <Pressable onPress={() => (navigation.navigate('Orders', { orders }))} style={{ backgroundColor: '#fb4e30', height: 50, width: 50, marginHorizontal:14, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
            <Icon name="profile" size={30} color="white" />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Home