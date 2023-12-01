import React, { useState } from 'react';
import { Button, Text, TextInput, View, Image, ImageBackground, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './LoginStyle';

const imgbg = './bg.png';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goTopage = (path: string) => {
    navigation.navigate(path);
  };

  // const handleLogin = () => {
  //   if (!email && !password) {
  //     Alert.alert('Preencha todos os campos', 'Informe seu email e senha.');
  //     return;
  //   }

  //   if (!email) {
  //     Alert.alert('Campo obrigatório', 'Informe seu email.');
  //     return;
  //   }

  //   if (!password) {
  //     Alert.alert('Campo obrigatório', 'Informe sua senha.');
  //     return;
  //   }

  //   if (!email.includes('@') || !email.includes('.com')) {
  //     Alert.alert('Email inválido', 'Informe um email válido.');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     Alert.alert('Senha inválida', 'A senha deve ter no mínimo 6 caracteres.');
  //     return;
  //   }

  //   const fakeUser = { email: 'usuario@gmail.com', password: 'senha123' };
  //   if (email === fakeUser.email && password === fakeUser.password) {
  //     Alert.alert('Login bem-sucedido', 'Bem-vindo!');
  //     goTopage('Home')
  //   } else {
  //     Alert.alert('Usuário não encontrado', 'Verifique suas credenciais.');
  //   }
  // };

  return (
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
              <Button onPress={() => goTopage('Home')} title="Entrar"></Button>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;