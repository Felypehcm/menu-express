import { useState, useEffect }from "react";
import { Text, ScrollView, Pressable, ToastAndroid, View } from "react-native"
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const Orders = ({route}: any) => {
  const navigation = useNavigation();
    const{cartItems} = route.params
    const openToast = (message: string) => {
        ToastAndroid.show(message, 3000)
      }
    
    //const [orders, setOrders] = useState([...cartItems]);  
    
    return (
      <>
        <ScrollView>
            <Text>Lista de seus Pedidos:</Text>
      {/* {cartItems.map((prod: any, i: number) => (
        <Card key={i}>
          <Card.Title style={{ fontSize: 22 }}> {prod.name} </Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: prod.image }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, margin: 8 }}>
              Preço: {prod.price * prod.quantity}
            </Text>
          </View>
        </Card>
      ))} */}
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

        <Pressable  onPress={()=> (navigation.navigate('ShoppingCart'))} style={{backgroundColor:'#fb4e30',
                        height: 50,
                        width: 50,
                        marginHorizontal:12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:50}}><Icon name="shoppingcart" size={30} color="white"></Icon></Pressable>

        <Pressable onPress={()=> (navigation.navigate('Favorites'))} style={{backgroundColor:'#fb4e30',
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