import React from 'react'
import { Button, Text, TextInput, View, Image, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import styles from '../login/LoginStyle'

const imgbg='./bg.png'

const ForgotPassword = ({navigation}: any) => {
  const goTopage = (path: string) => {
    navigation.navigate(path)
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : 'height'}
    keyboardVerticalOffset={10}
    style={styles.container}>
      <ScrollView style={{width: "100%"}}>
    <View style={styles.container}>
      <ImageBackground source={(require(imgbg))} style={styles.imgbg}>
       <View style={styles.box}>
        <View style={styles.logo}>
        <Image source={require('../../../assets/logo.png')}/>
        </View>
        <Text style={styles.text}>Digite seu email</Text>
        <TextInput style={styles.input} returnKeyType="done"/>
        <Text style={styles.text}>Confirme seu email</Text>
        <TextInput style={styles.input} returnKeyType="done"/>
        <Button onPress={() => {goTopage("Login")}} title="Enviar"></Button>
        </View>
      </ImageBackground>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgotPassword