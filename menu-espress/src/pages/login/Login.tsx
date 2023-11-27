import React from 'react'
import { Button, Text, TextInput, View, Image, ImageBackground } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import styles from './LoginStyle'


const imgbg='./bg.png'

const Login = ({navigation}: any) => {
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
          <Text style={styles.text}>Login</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Digite um email...' 
            keyboardType='email-address' 
            autoCapitalize='none' 
            autoComplete='email'
            returnKeyType='done' />

          <Text style={styles.text}>Password</Text>
          <TextInput 
            secureTextEntry={true} 
            style={styles.input} 
            placeholder='Digite sua senha...'
            keyboardType='number-pad'
            returnKeyType='done' />
            
          <View style={styles.createForgortLink}>
            <Text onPress={() => {goTopage("createAccount")}} style={styles.link}>Create Accout</Text>
            <Text onPress={() => {goTopage("forgotPassword")}} style={styles.link}>Forgot Password</Text>
          </View>
          <Button onPress={() => {goTopage("Home")}} title="Entrar"></Button>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Login