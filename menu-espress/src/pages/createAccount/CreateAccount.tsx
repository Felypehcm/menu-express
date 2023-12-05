import React, { useState } from 'react'
import { Button, TextInput, View, Image, ImageBackground, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import styles from '../createAccount/CreateAccountStyle'
import { CheckBox } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import httpService from '../../httpService';

const imgbg='./bg.png'

const CreateAccount = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSelected, setSelected] = useState(false);

  const goTopage = (path: string) => {
    navigation.navigate(path);
  };

  const handleSignUp = async () => {
    // Verifica se ta vazio o campo
    if (!name || !email || !password || !confirmPassword) {
      console.error('Preencha todos os campos.');
      return;
    }

    // Se as senhas for diferente informa
    if (password !== confirmPassword) {
      console.error('Senhas não coincidem.');
      return;
    }

    // Só se cadastra se o checkbox tiver marcado
    if (!isSelected) {
      console.error('Você deve aceitar os termos de uso para se cadastrar.');
      return;
    }

    try {
      const result = await httpService.signup(name, email, password);

      if (result) {
        const data = await result.json();

        if (result.status === 201) {
          console.log('Usuário cadastrado com sucesso:', data);
          goTopage('Login');
        } else {
          console.error('Erro ao cadastrar usuário:', data.error);
        }
      } else {
        console.error('Erro na resposta do servidor.');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação de cadastro:', error);
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : 'height'}
    keyboardVerticalOffset={10}
    style={styles.container}>
      <ScrollView style={{width: "100%"}}>
      <ImageBackground source={(require(imgbg))} style={styles.imgbg}>
        <View style={styles.box}>
          <View style={styles.logo}>
            <Image source={require('../../../assets/logo.png')}/>
          </View>
          <Text style={styles.text}>Digite seu nome completo</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nome' 
            returnKeyType="done" 
            onChangeText={(text) => setName(text)}/>

          <Text style={styles.text}>Digite seu email</Text>
          <TextInput 
            style={styles.input}
            placeholder='Email' 
            returnKeyType="done" 
            onChangeText={(text) => setEmail(text)}/>

          <Text style={styles.text}>Digite sua senha</Text>
          <TextInput 
            secureTextEntry={true} 
            style={styles.input}
            placeholder='Senha'
            returnKeyType='done' 
            onChangeText={(text) => setPassword(text)}/>

          <Text style={styles.text}>Confirme sua senha</Text>
          <TextInput 
            secureTextEntry={true} 
            style={styles.input}
            placeholder='Senha'
            returnKeyType='done' 
            onChangeText={(text) => setConfirmPassword(text)}/>

            <CheckBox title={'Eu aceito os termos de uso'}
              checkedIcon={'check'}
              uncheckedIcon={'square-o'}
              checkedColor='green'
              uncheckedColor='red'
              checked={isSelected}
              onPress={() => setSelected(!isSelected)}/>

          <Button onPress={handleSignUp} title="Cadastrar"></Button>
          </View>
      </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateAccount