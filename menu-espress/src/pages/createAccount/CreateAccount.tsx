import React from 'react'
import { Button, TextInput, View, Image, ImageBackground } from 'react-native';
import { Text } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import styles from '../createAccount/CreateAccountStyle'

const imgbg='./bg.png'

const CreateAccount = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={(require(imgbg))} style={styles.imgbg}>
        <View style={styles.box}>
          <View style={styles.logo}>
            <Image source={require('../tentativa6.png')}/>
          </View>
          <Text style={styles.text}>Digite seu nome completo</Text>
          <TextInput style={styles.input} />
          <Text style={styles.text}>Digite seu email</Text>
          <TextInput style={styles.input} />
          <Text style={styles.text}>Digite sua senha</Text>
          <TextInput secureTextEntry={true} style={styles.input} />
          <Text style={styles.text}>Confirme sua senha</Text>
          <TextInput secureTextEntry={true} style={styles.input} />

          <Button title="Enviar" ></Button>
          </View>
      </ImageBackground>
    </View>
  );
}

export default CreateAccount