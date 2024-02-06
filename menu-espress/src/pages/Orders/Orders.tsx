import { useState, useEffect }from "react";
import { Text, ScrollView, Pressable, View } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import httpService from "../../httpService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './OrderStyle'

const Orders = ({favorites, shoppingCart} : any) => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([])
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const seeOrders = async () => {
        const email = await AsyncStorage.getItem('userEmail');
        
        setUserEmail(email)

        if (email) {
          const response = await httpService.searchByEmail(email);
          setOrders(response.orders);
        } 
      };

      seeOrders();
    } catch (error) {
      console.log('Erro: ', error)
    }
    
  }, []);

  const openToast = (message: string) => {
      Toast.show({
        type: 'success',
        text1: message
      });
  }

    return (
      <>
        <View style={{height: '90%'}}>
          <ScrollView style={{ marginBottom: 80 }}>
            {orders.map((order: any, index: number) => (
              <View key={index} style={styles.orderCard}>
                <Text style={styles.cardTitle}>Pedido {index + 1}:</Text>
                {order.products.map((product: any, productIndex: number) => (
                <View key={productIndex} style={styles.productInfo}>
                  <Text>Produto: {product.name}</Text>
                  <Text>Quantidade: {product.descount}</Text>
                  <Text>Preço: R${((product.price) * product.descount).toFixed(2)}</Text>
                </View>
                ))}
                <Text style={styles.totalPrice}>
                  Valor da nota: R${order.finalPrice !== undefined ? order.finalPrice.toFixed(2) : 'Indisponível'}
                </Text>
              </View>
            ))}
            <View style={styles.totalPriceBottomContainer}>
            </View>
          </ScrollView>
        </View>
    
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