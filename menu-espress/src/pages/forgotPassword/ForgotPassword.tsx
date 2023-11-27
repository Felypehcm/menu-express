import React from 'react'
import { Button, Text, TextInput, View, Image, ImageBackground } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import styles from '../login/LoginStyle'

const imgbg='./bg.png'

const ForgotPassword = ({navigation}: any) => {
  const goTopage = (path: string) => {
    navigation.navigate(path)
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={(require(imgbg))} style={styles.imgbg}>
       <View style={styles.box}>
        <View style={styles.logo}>
        <Image source={require('../tentativa6.png')}/>
        </View>
        <Text style={styles.text}>Digite seu email</Text>
        <TextInput style={styles.input} />
        <Text style={styles.text}>Confirme seu email</Text>
        <TextInput style={styles.input} />
        <Button onPress={() => {goTopage("Login")}} title="Enviar"></Button>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ForgotPassword