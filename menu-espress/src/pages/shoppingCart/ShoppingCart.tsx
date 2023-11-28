import React from "react";
import { Text } from "react-native"
import { Card } from 'react-native-elements'

const ShoppingCart = ({route}: any) => {
    const{shoppingCart} = route.params
    return (
        shoppingCart.map((prod: any, i: number) => (
            <>
                <Card key={i}>
                    <Card.Title style={{fontSize: 22}}> {prod.name} </Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{uri: prod.image}}/>
                    <Text style={{fontSize: 16, marginEnd: "5%", marginBottom: "5%", marginTop: "3%"}}> Preço: {prod.price} </Text>
                </Card>
            </>
        ))
    )
}

export default ShoppingCart