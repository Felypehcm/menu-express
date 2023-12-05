import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Certifique-se de ter o axios instalado

import styles from './ProfileStyle';

const Profile = ({ navigation }: any) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const profileImage = await AsyncStorage.getItem('userProfileImage');

        setUserName(name);
        setUserEmail(email);
        setUserProfileImage(profileImage);
      } catch (error) {
        console.error('Erro ao recuperar informações do usuário:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userProfileImage');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const changePassword = () => {
    // Lógica para mudar a senha
  };

  const handlePickerImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita que sua aplicação acesse as imagens'
      );
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (canceled) {
        ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
      } else {
        // Lógica para lidar com a imagem selecionada
        const selectedImageUri = assets.length > 0 ? assets[0].uri : null;
  
        if (selectedImageUri) {
          // Salvar a imagem no banco de dados
          saveImageToDatabase(selectedImageUri);
        }
      }
    }
  };

  const saveImageToDatabase = async (imageUri: string) => {
    try {
      // Chame sua API ou lógica de banco de dados aqui para salvar a URI da imagem
      const response = await axios.post('http://localhost:8080/api/user/uploadAvatar', { imageUri });

      // Verifique a resposta do servidor e tome as medidas apropriadas
      if (response.status === 200) {
        // Atualize o estado ou faça o que for necessário
        setUserProfileImage(imageUri);

        // Salve a URI da imagem no AsyncStorage ou no estado, conforme necessário
        AsyncStorage.setItem('userProfileImage', imageUri);

        ToastAndroid.show('Imagem salva com sucesso', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Erro ao salvar imagem', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Erro ao salvar imagem no banco de dados:', error);
      ToastAndroid.show('Erro ao salvar imagem', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Pressable onPress={handlePickerImage}>
          {userProfileImage ? (
            <Image style={styles.profileImage} source={{ uri: userProfileImage }} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>Adicionar Foto</Text>
            </View>
          )}
        </Pressable>
        <View style={styles.textView}>
          <Text style={styles.text}>Nome: {userName}</Text>
          <Text style={styles.text}>Email: {userEmail}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={changePassword} style={styles.button}>
            <Text style={styles.buttonText}>Mudar Senha</Text>
          </Pressable>

          <Pressable onPress={logout} style={styles.button}>
            <Text style={styles.buttonText}>Sair do Aplicativo</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;
