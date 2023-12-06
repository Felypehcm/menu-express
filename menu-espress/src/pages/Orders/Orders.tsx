import { useState, useEffect }from "react";
import { Text, ScrollView, Pressable, View } from "react-native"
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Orders = ({favorites, shoppingCart} : any) => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([])
    const openToast = (message: string) => {
        Toast.show({
          type: 'success',
          text1: message
        });
      }
      
    return (
      <>
        <ScrollView style={{ marginBottom: 80}}>
            <Text>Lista de seus Pedidos:</Text>
      {orders.map((order: any, index: number) => (
        <Card key={index}  style={{ alignItems: 'center'}}>
          <Text style={{ fontSize: 22 }}> Pedido: {index + 1} </Text>
              {order.products.map((prod: any, productIndex: number) => ( 
                  <View key={productIndex}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, margin: 8}}>
                        Produto: {prod.name}  Quantidade: {prod.quantity} Preço: R${(prod.price * prod.quantity).toFixed(2)}
                      </Text>
                    </View>
                  </View>
              ))} 
              <Text style={{ fontSize: 16, margin: 8 }}>
              Total: R${order.total.toFixed(2)}
              </Text>
        </Card>
      ))}
    </ScrollView>
    
    <View style={{position:'absolute', bottom: 0}}>
      <View style={{position:'absolute', bottom: 0, flexDirection:'row', borderRadius: 50, justifyContent: 'space-between', marginHorizontal: 45, marginVertical: 20}}>
        <Pressable onPress={()=> (navigation.navigate('Home'))} style={{backgroundColor:'#fb4e30',
                        height: 50,
                        width: 50,
                        marginHorizontal:12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:50}}><Icon name="home" size={30} color="white"></Icon></Pressable>

        <Pressable  onPress={()=> (navigation.navigate('ShoppingCart', {shoppingCart}))} style={{backgroundColor:'#fb4e30',
                        height: 50,
                        width: 50,
                        marginHorizontal:12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:50}}><Icon name="shoppingcart" size={30} color="white"></Icon></Pressable>

        <Pressable onPress={()=> (navigation.navigate('Favorites', {favorites}))} style={{backgroundColor:'#fb4e30',
                        height: 50,
                        width: 50,
                        marginHorizontal:12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50}}><Icon name="heart" size={30} color="white"></Icon></Pressable>

        <Pressable style={{backgroundColor:'#fb4e30',
                        height: 50,
                        width: 50,
                        marginHorizontal:12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50}}><Icon name="profile" size={30} color="white"/></Pressable>
      </View>
    </View>
    </>

    )   
}

export default Orders