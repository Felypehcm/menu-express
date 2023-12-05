import { Button, Text, TextInput, View, Image, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native'
import styles from '../login/LoginStyle'
import React, { useState, useEffect } from 'react';
import httpService from '../../httpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageService from '../../storageService';

const imgbg='./bg.png'

const ForgotPassword = ({navigation}: any) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pastPassword, setPastPassword] = useState('');

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
  }, []);

  const goTopage = (path: string) => {
    navigation.navigate(path)
  }

  const update = async () => {
    const result = await httpService.updatePassword(userEmail || '', pastPassword, newPassword);
    const data = await result.json();

    if (result.status === 200) {
      try {
        storageService.set('userData', JSON.stringify(data));
        goTopage('Login');
        ToastAndroid.show(data.message, 5000);
      } catch (e) {
        ToastAndroid.show('Não foi possível logar no sistema. Tente novamente mais tarde!', 5000)
      }  
    }
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
        <Text style={styles.text}>Digite sua senha antiga:</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text) => setPastPassword(text)}
        returnKeyType="done"/>
        <Text style={styles.text}>Digite sua nova senha:</Text>
        <TextInput 
        style={styles.input} 
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}/>
        <Text style={styles.text}>Confirme sua nova senha:</Text>
        <TextInput 
        style={styles.input} 
        returnKeyType="done"
        onChangeText={(text) => setNewPassword(text)}/>
        <Button onPress={update} title="Enviar"></Button>
        </View>
      </ImageBackground>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgotPassword