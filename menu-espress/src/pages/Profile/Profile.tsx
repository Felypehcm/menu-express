import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Certifique-se de ter o axios instalado
import Toast from 'react-native-toast-message';

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

  const goTopage = (path: string) => {
    navigation.navigate(path)
  }

  const changePassword = () => {
    goTopage('forgotPassword')
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
        Toast.show({
          type: 'success',
          text1: 'Operação cancelada'
        });
      } else {
        const selectedImage = assets && assets.length > 0 ? assets[0] : null;
  
        if (selectedImage) {
          // Salvar a imagem no banco de dados
          saveImageToDatabase(selectedImage.uri);
        }
      }
    }
  };

  const saveImageToDatabase = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append('avatar', imageUri);
      formData.append('email', userEmail || '');
  
      // Chame sua API ou lógica de banco de dados aqui para salvar a URI da imagem
      const response = await axios.post('http://10.5.7.212:8080/api/user/uploadAvatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Verifique a resposta do servidor e tome as medidas apropriadas
      if (response.status === 200) {
        // Atualize o estado ou faça o que for necessário
        setUserProfileImage(imageUri);
  
        // Salve a URI da imagem no AsyncStorage ou no estado, conforme necessário
        AsyncStorage.setItem('userProfileImage', imageUri);  
        Toast.show({
          type: 'success',
          text1: 'Imagem salva com sucesso'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao salvar imagem'
        });
      }
    } catch (error) {
      console.error('Erro ao salvar imagem no banco de dados:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar imagem'
      });
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
