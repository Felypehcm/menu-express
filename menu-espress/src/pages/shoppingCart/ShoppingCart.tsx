import { useState, useEffect }from "react";
import { Text, ScrollView, Pressable, ToastAndroid, View } from "react-native"
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

const ShoppingCart = ({route}: any) => {
    const{shoppingCart} = route.params
    const openToast = (message: string) => {
        ToastAndroid.show(message, 3000)
      }

    const [cartItems, setCartItems] = useState([...shoppingCart]);

    useEffect(() => {
      const updatedCart = cartItems.filter((item) => item.quantity > 0);
      if (!arraysEqual(cartItems, updatedCart)) {
        setCartItems(updatedCart);
      }
    }, [cartItems])

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
    
    return (
        <ScrollView>
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
    )   
}

export default ShoppingCart