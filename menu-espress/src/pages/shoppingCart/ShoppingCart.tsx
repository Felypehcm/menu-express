import React from "react";
import { Text } from "react-native"

const ShoppingCart = ({route}: any) => {
    const{shoppingCart} = route.params
    return (
        shoppingCart.map((prod: any, i: number) => (
            <Text>{prod.name}</Text>
        ))
    )
}

export default ShoppingCart