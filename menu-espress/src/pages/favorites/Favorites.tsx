import React from 'react'
import { Text, View, Pressable, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';


const Favorites = ({ favorites, shoppingCart, Orders, setFavorites, setShoppingCart }: any) => {

  const navigation = useNavigation();

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

  return (
    <>
    <View style={{height: '90%'}}>
    <ScrollView >
      {favorites.map((prod: any, i: number) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#CCC'}}>
          <View style={{ width: 120, height: 120 }}>
            <Image source={{ uri: `data:image/jpeg;base64,${prod.imageUrl}`, width: '100%', height: '100%' }} />
          </View>
          <View style={{ margin: 15, width: '65%', height: 120, justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 20, marginBottom: "3%", fontWeight: 'bold' }}> {prod.name} </Text>
            <Text style={{ fontSize: 12}}> Descrição: {prod.description} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
              <Pressable onPress={() => {
                    prod.descount += 1;
                    const existingProductIndex = shoppingCart.findIndex((cartItem: any) => cartItem._id === prod._id);
                    const updatedCart = [...shoppingCart];
                    const emptyProduct = shoppingCart.find((prod: any) => prod.descount <= 0);
                    if (existingProductIndex !== -1) {
                      updatedCart[existingProductIndex].descount += 1;
                    } else {
                      updatedCart.push({ ...prod, descount: 1 });
                    }
                    setShoppingCart(updatedCart);
                    if (emptyProduct) {
                      const notEmptyProducts = shoppingCart.filter((item: any) => item.descount > 0);
                      setShoppingCart(notEmptyProducts)
                    };
                    }}style={({ pressed }: any) => ({backgroundColor: pressed ? '#2089dc' : '#fb4e30', height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingHorizontal: 10})}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Adicionar</Text>
                  </Pressable>
                  
                  <Icon
                      name={favorites.some((favItem: any) => favItem._id === prod._id) ? "heart" : "hearto"}
                      size={28}
                      onPress={() => toggleFavorite(prod)}
                      color={favorites.some((favItem: any) => favItem._id === prod._id) ? "red" : "black"}
                  />

            </View>

            </View>
        </View>
      ))}
    </ScrollView>
    </View>
    
    <View style={{position:'absolute', bottom: 0}}>
      <View style={{flexDirection:'row', borderRadius: 50, justifyContent: 'space-between', marginHorizontal: 50, marginVertical: 20}}>
          <Pressable onPress={()=> (navigation.navigate('Home'))} style={{backgroundColor:'#fb4e30',
                          height: 50,
                          width: 50,
                          marginHorizontal:14,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius:50}}><Icon name="home" size={30} color="white"></Icon></Pressable>

          <Pressable  onPress={()=> navigation.navigate('ShoppingCart', {shoppingCart})} style={{backgroundColor:'#fb4e30',
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
