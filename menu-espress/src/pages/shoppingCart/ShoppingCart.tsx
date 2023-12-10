import { useState, useEffect }from "react";
import { Text, ScrollView, Pressable, View } from "react-native"
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import httpService from "../../httpService";
import storageService from '../../storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ShoppingCart = ({route}: any) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]); 
    const{shoppingCart} = route.params
    const openToast = (message: string) => {
        Toast.show({
          type: 'success',
          text1: message
        });
      }

    const [cartItems, setCartItems] = useState([...shoppingCart]);
    const [totalToPay, setTotalToPay] = useState(0);

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const email = await AsyncStorage.getItem('userEmail');
          setUserEmail(email);
        } catch (error) {
          console.error('Erro ao recuperar informações do usuário:', error);
        }
      };
  
      fetchUserProfile();
      const updatedCart = cartItems.filter((item) => item.descount > 0);
      if (!arraysEqual(cartItems, updatedCart)) {
        setCartItems(updatedCart);
      }

      const total = updatedCart.reduce(
        (accumulator, item) => accumulator + item.price * item.descount,
        0
      );
      setTotalToPay(total);
    }, [cartItems,totalToPay])

    function arraysEqual(arr1: any, arr2: any) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    const handleRemoveItem = (index: number) => {
      const updatedCart = [...cartItems];
      updatedCart[index].descount -= 1;
  
      if (updatedCart[index].descount <= 0) {
        openToast("Item removido com sucesso!");
        // Remove o item se a quantidade for menor ou igual a 0
        updatedCart.splice(index, 1);
      }
  
      setCartItems(updatedCart);
    };
  
    const handleAddItem = (index: number) => {
      openToast("Item adicionado com sucesso!");
      const updatedCart = [...cartItems];
      updatedCart[index].descount += 1;
      setCartItems(updatedCart);
    };

    const goTopage = (path: string) => {
      navigation.navigate(path)
    }

    const addOrder = async () => {
      
      const newOrder = {
        products: cartItems.map(item => ({ ...item })), 
        finalPrice: cartItems.reduce((total, item) => total + item.price * item.descount, 0),
      };


      const result = await httpService.addOrder(userEmail || '' , newOrder);
      const data = await result!.json();
      console.log("aqui1");
      console.log(result?.status);

      if (result!.status === 200) {
        try {
          console.log("aqui2");
          storageService.set('userData', JSON.stringify(data));
          goTopage('Orders');
          Toast.show({
            type: 'success',
            text1: data.message
          });
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: 'Não foi possível fazer a compra. Tente novamente mais tarde!'
          });
        }  
      }
      


      const updatedOrders = [...orders, newOrder];


      setOrders(updatedOrders);
    };
    
    return (
      <>
        <ScrollView style={{ marginBottom: 80 }}>
      {cartItems.map((prod: any, i: number) => (
        <Card key={i}>
          <Card.Title style={{ fontSize: 22 }}> {prod.name} </Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: `data:image/jpeg;base64,${prod.imageUrl}` }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, margin: 8 }}>
              Preço: {prod.price * prod.descount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Pressable
              onPress={() => handleRemoveItem(i)}
              style={({ pressed }: any) => ({
                backgroundColor: pressed ? '#2089dc' : '#fb4e30',
                height: 40,
                width: '30%',
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                marginBottom: 8,
              })}
            >
              <Text style={{ fontSize: 24, color: 'white' }}>-</Text>
            </Pressable>
            <Text style={{ fontSize: 32, color: 'black', marginBottom: 8 }}>
              {prod.descount}
            </Text>
            <Pressable
              onPress={() => handleAddItem(i)}
              style={({ pressed }: any) => ({
                backgroundColor: pressed ? '#2089dc' : '#fb4e30',
                height: 40,
                width: '30%',
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              })}
            >
              <Text style={{ fontSize: 24, color: 'white' }}>+</Text>
            </Pressable>
          </View>
        </Card>
      ))}
    </ScrollView>
    
    <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Valor Total: R${totalToPay.toFixed(2)}</Text>
          <Pressable
            onPress = {()=> {
              addOrder()
            }}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? '#2089dc' : '#fb4e30',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              width: '40%', // Adjust the width as needed
            })}>
            <Text style={{ fontSize: 18, color: 'white' }}>Comprar</Text>
          </Pressable>
        </View>
      </View>
    </>

    )   
}

export default ShoppingCart