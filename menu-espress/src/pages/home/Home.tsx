import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, ToastAndroid } from 'react-native'
import { Button, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

const productsSanduiches = [
  {name: "X Bacon", price: "R$ 32,00", description: "X Bacon", image: "https://embutidosbonatti.ind.br/temp/BIN_57_V9Fb0BwK.jpg"},
  {name: "X Salad", price: "R$ 28,00", description: "X Salad", image: "https://d1etmlapode6io.cloudfront.net/images/fidelizze/demofood/items/rsz_ilya-mashkov-mkva2hljgni-unsplash_637260269992723902.jpg"},
  {name: "X Egg", price: "R$ 28,00", description: "X Egg", image: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-x-egg-4-730x449.jpg"},
  {name: "X Calabresa", price: "R$ 28,00", description: "X Calabresa", image: "https://storage.googleapis.com/domain-images/bd77a99c-250c-464d-816b-e8f862fd1122/products/gallery_301e217e-7a0f-456a-9db5-fe871ace1f09.jpg"},
  {name: "X Frango", price: "R$ 30,00", description: "X Frango", image: "https://looklanches.com.br/wp-content/uploads/2020/09/x-frango-tudo.jpg"},
  {name: "Cachorro Quente", price: "R$ 15,00", description: "Cachorro Quente", image: "https://receitinhas.com.br/wp-content/uploads/2022/06/cachorro-quente-tradicional-2.jpg"},
  {name: "Sanduiche de Mortadela", price: "R$ 30,00", description: "Sanduiche de Mortadela", image: "https://www.fmetropolitana.com.br/wp-content/uploads/2023/01/Brazuca-Marba-e-Mortadela-Brasil.jpg"},
  {name: "Duplo Smash", price: "R$ 32,00", description: "Duplo Smash", image: "https://i.pinimg.com/736x/7d/55/ba/7d55ba09657e63902cc7e5afcf9a1e7a.jpg"},
  {name: "Bauru", price: "R$ 34,00", description: "Bauru", image: "https://i0.statig.com.br/bancodeimagens/2r/5g/l7/2r5gl73lyxqlpxwoodysu86q5.jpg"}
]

const productsCombos = [
  {name: "Combo 1", price: "R$ 42,00", description: "X Bacon + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 2", price: "R$ 38,00", description: "X Salad + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 3", price: "R$ 36,00", description: "X Egg + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 4", price: "R$ 38,00", description: "X Calabresa + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 5", price: "R$ 40,00", description: "X Frango + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 6", price: "R$ 25,00", description: "Cachorro Quente + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 7", price: "R$ 40,00", description: "Sanduiche de Mortadela + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 8", price: "R$ 42,00", description: "Duplo Smash + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"},
  {name: "Combo 9", price: "R$ 44,00", description: "Bauru + batata + refri", image: "https://acdn.mitiendanube.com/stores/690/117/products/kit-lanche-preto-montado1-00be5f13af68efb59115866449530210-640-0.jpg"}
]

const productsBebidas = [
  {name: "Agua", price: "R$ 3,00", description: "Agua", image: "https://ibassets.com.br/ib.item.image.large/l-fd83a662da92460c81fae7b06f0f8bb2.jpeg"},
  {name: "Agua com Gás", price: "R$ 5,00", description: "Agua com gás", image: "https://ibassets.com.br/ib.item.image.large/l-837005f8a02049e58cb3ec8fdaef341d.jpeg"},
  {name: "Coca cola Lata", price: "R$ 6,00", description: "Coca cola Lata", image: "https://www.imigrantesbebidas.com.br/bebida/images/products/full/1984-refrigerante-coca-cola-lata-350ml.jpg"},
  {name: "Guaraná Lata", price: "R$ 6,00", description: "Guaraná Lata", image: "https://m.media-amazon.com/images/I/71eC76jOlpL.jpg"},
  {name: "Fanta Lata", price: "R$ 6,00", description: "Fanta Lata", image: "https://cdn.irmaospatrocinio.com.br/img/p/1/6/8/6/7/9/168679-large_default.jpg"},
  {name: "Sprit Lata", price: "R$ 6,00", description: "Sprite Lata", image: "data:image/jpeg;base64,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"},
  {name: "Café", price: "R$ 5,00", description: "Café", image: "data:image/jpeg;base64,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"}
]

const Home = ({shoppingCart, setShoppingCart, favorites, setFavorites}: any) => {
  const openToast = (message: string) => {
    ToastAndroid.show(message, 3000)
  }
  return (
    <ScrollView>
      <StatusBar backgroundColor='black'/>
      <ScrollView>
        <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>Sanduiches</Text>
        {
          productsSanduiches.map((product, i) => {
            const [favorite, setFavorite] = useState(false)
            return (
              <Card key={i}>
                <Card.Title style={{fontSize: 30}}> {product.name} </Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: product.image}}/>
                <Text> Descrição: {product.description} </Text>
                <Text style={{fontSize: 20, marginEnd: "5%", marginBottom: "10%", marginTop: "3%"}}> Preço: {product.price} </Text>
                {
                  favorite ? 
                  <Icon onPress={() => (setFavorite(false))} name="heart" size={28} color="red"></Icon>:
                  <Icon onPress={() => (setFavorite(true))} name="hearto" size={28}></Icon>
                }
                {/*<Button onPress={() => {
                  setShoppingCart([...shoppingCart, product])
                }} title="Adicionar ao Carrinho"></Button>*/}

                <Pressable onPress={() => {
                  openToast("Item adicionado com sucesso!")
                  setShoppingCart([...shoppingCart, product])
                }}
                style={
                  ({pressed}:any) => (
                    {
                      backgroundColor: pressed ? '#2089dc' : '#fb4e30',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8
                    }
                  )
                }>
                  <Text style={{fontSize: 18, color: 'white'}}>Adicionar ao Carrinho</Text>
                </Pressable>
              </Card>
            )
          })
        }
      </ScrollView>
      <ScrollView >
      <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>Combos</Text>
        {
          productsCombos.map((product, i) => {
            const [favorite, setFavorite] = useState(false)
            return (
              <Card key={i}>
                <Card.Title style={{fontSize: 30}}> {product.name} </Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: product.image}}/>
                <Text> Descrição: {product.description} </Text>
                <Text style={{fontSize: 20, marginEnd: "5%", marginBottom: "10%", marginTop: "3%"}}> Preço: {product.price} </Text>
                {
                  favorite ? 
                  <Icon onPress={() => (setFavorite(false))} name="heart" size={28} color="red"></Icon>:
                  <Icon onPress={() => (setFavorite(true))} name="hearto" size={28}></Icon>
                }
                {/*<Button onPress={() => {
                  setShoppingCart([...shoppingCart, product])
                }} title="Adicionar ao Carrinho"></Button>*/}

                <Pressable onPress={() => {
                  openToast("Item adicionado com sucesso!")
                  setShoppingCart([...shoppingCart, product])
                }}
                style={
                  ({pressed}:any) => (
                    {
                      backgroundColor: pressed ? '#2089dc' : '#fb4e30',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8
                    }
                  )
                }>
                  <Text style={{fontSize: 18, color: 'white'}}>Adicionar ao Carrinho</Text>
                </Pressable>
              </Card>
            )
          })
        }
      </ScrollView>
      <ScrollView >
      <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>Combos</Text>
        {
          productsBebidas.map((product, i) => {
            const [favorite, setFavorite] = useState(false)
            return (
              <Card key={i}>
                <Card.Title style={{fontSize: 30}}> {product.name} </Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: product.image}}/>
                <Text> Descrição: {product.description} </Text>
                <Text style={{fontSize: 20, marginEnd: "5%", marginBottom: "10%", marginTop: "3%"}}> Preço: {product.price} </Text>
                {
                  favorite ? 
                  <Icon onPress={() => (setFavorite(false))} name="heart" size={28} color="red"></Icon>:
                  <Icon onPress={() => (setFavorite(true))} name="hearto" size={28}></Icon>
                }
                {/*<Button onPress={() => {
                  setShoppingCart([...shoppingCart, product])
                }} title="Adicionar ao Carrinho"></Button>*/}

                <Pressable onPress={() => {
                  openToast("Item adicionado com sucesso!")
                  setShoppingCart([...shoppingCart, product])
                }}
                style={
                  ({pressed}:any) => (
                    {
                      backgroundColor: pressed ? '#2089dc' : '#fb4e30',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8
                    }
                  )
                }>
                  <Text style={{fontSize: 18, color: 'white'}}>Adicionar ao Carrinho</Text>
                </Pressable>
              </Card>
            )
          })
        }
      </ScrollView>
    </ScrollView>

  )
}

export default Home