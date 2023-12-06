import { useState, useEffect }from "react";
import { Text, ScrollView, Pressable, View } from "react-native"
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const ShoppingCart = ({route}: any) => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]); 
    const{shoppingCart, setShoppingCart} = route.params
    const openToast = (message: string) => {
        Toast.show({
          type: 'success',
          text1: message
        });
      }

    const [cartItems, setCartItems] = useState([...shoppingCart]);
    const [totalToPay, setTotalToPay] = useState(0);

    useEffect(() => {
      const updatedCart = cartItems.filter((item) => item.quantity > 0);
      if (!arraysEqual(cartItems, updatedCart)) {
        setCartItems(updatedCart);
      }

      const total = updatedCart.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      );
      setTotalToPay(total);
    }, [cartItems,totalToPay])

    function arraysEqual(arr1: any, arr2: any) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    const handleRemoveItem = (index: number) => {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity -= 1;
  
      if (updatedCart[index].quantity <= 0) {
        openToast("Item removido com sucesso!");
        // Remove o item se a quantidade for menor ou igual a 0
        updatedCart.splice(index, 1);
      }
  
      setCartItems(updatedCart);
    };
  
    const handleAddItem = (index: number) => {
      openToast("Item adicionado com sucesso!");
      const updatedCart = [...cartItems];
      updatedCart[index].quantity += 1;
      setCartItems(updatedCart);
    };



    const addOrder = () => {
   

      const newOrder = {
        products: cartItems.map(item => ({ ...item })), 
        total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };


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
          <Card.Image source={{ uri: prod.image }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, margin: 8 }}>
              Preço: {prod.price * prod.quantity}
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
              {prod.quantity}
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
              navigation.navigate('Orders', { orders: orders })
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