import React, { useState } from 'react'
import { Button, TextInput, View, Image, ImageBackground } from 'react-native';
import { Text } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import styles from '../createAccount/CreateAccountStyle'
import { CheckBox } from 'react-native-elements';

const imgbg='./bg.png'



const CreateAccount = ({navigation}: any) => {
  const goTopage = (path: string) => {
    navigation.navigate(path)
  }

  const[isSelected, setSelected] = useState(false)

  return (
    <View style={styles.container}>
      <ImageBackground source={(require(imgbg))} style={styles.imgbg}>
        <View style={styles.box}>
          <View style={styles.logo}>
            <Image source={require('../tentativa6.png')}/>
          </View>
          <Text style={styles.text}>Digite seu nome completo</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nome' />

          <Text style={styles.text}>Digite seu email</Text>
          <TextInput 
            style={styles.input}
            placeholder='Email' />

          <Text style={styles.text}>Digite sua senha</Text>
          <TextInput 
            secureTextEntry={true} 
            style={styles.input}
            placeholder='Senha'
            keyboardType='number-pad'
            returnKeyType='done' />

          <Text style={styles.text}>Confirme sua senha</Text>
          <TextInput 
            secureTextEntry={true} 
            style={styles.input}
            placeholder='Senha'
            keyboardType='number-pad'
            returnKeyType='done' />

            <CheckBox title={'Eu aceito os teromos de uso'}
              checkedIcon={'check'}
              uncheckedIcon={'square-o'}
              checkedColor='green'
              uncheckedColor='red'
              checked={isSelected}
              onPress={() => setSelected(!isSelected)}/>

          <Button onPress={() => {goTopage("Login")}} title="Cadastrar"></Button>
          </View>
      </ImageBackground>
    </View>
  );
}

export default CreateAccount