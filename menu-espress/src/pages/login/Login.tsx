import React, { useState } from 'react';
import { Button, Text, TextInput, View, Image, ImageBackground, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import styles from './LoginStyle';
import httpService from '../../httpService';
import storageService from '../../storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const imgbg = './bg.png';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const onSubmit = async () => {
    const result = await httpService.login(email, password);
    const data = await result.json();
    if (result.status === 200) {
      try {
        storageService.set('userData', JSON.stringify(data));
        await AsyncStorage.setItem('userName', data.name);
        await AsyncStorage.setItem('userEmail', data.email);
        await AsyncStorage.setItem('userProfileImage', data.avatar ? data.avatar : 'assets/icone-perfil.png');
        Toast.show({
          type: 'success',
          text1: 'Usuário logado com sucesso'
        });
         goTopage('Home')
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Não foi possível logar no sistema. Tente novamente mais tarde!'
        });
      }
    } 

    if (!email && !password) {
      Alert.alert('Preencha todos os campos', 'Informe seu email e senha.');
      return;
    }

    if (!email) {
      Alert.alert('Campo obrigatório', 'Informe seu email.');
      return;
    }

    if (!password) {
      Alert.alert('Campo obrigatório', 'Informe sua senha.');
      return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      Alert.alert('Email inválido', 'Informe um email válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Senha inválida', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    
    else {
      Toast.show({
        type: 'error',
        text1: data.message
      });
    }
  }

  const goTopage = (path: string) => {
    navigation.navigate(path);
  };

  return (
  <>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={10} style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.container}>
          <ImageBackground source={require(imgbg)} style={styles.imgbg}>
            <View style={styles.box}>
              <View style={styles.logo}>
                <Image source={require('../../../assets/logo.png')} />
              </View>
              <Text style={styles.text}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite um email..."
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="done"
                onChangeText={(text) => setEmail(text)}
              />

              <Text style={styles.text}>Senha</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Digite sua senha..."
                returnKeyType="done"
                onChangeText={(text) => setPassword(text)}
              />

              <View style={styles.createForgortLink}>
                <Text onPress={() => goTopage('createAccount')} style={styles.link}>
                  Criar Conta
                </Text>
                <Text onPress={() => goTopage('forgotPassword')} style={styles.link}>
                  Esqueci a senha
                </Text>
              </View>
              <Button onPress={onSubmit} title="Entrar"></Button>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </>
  );
};

export default Login;