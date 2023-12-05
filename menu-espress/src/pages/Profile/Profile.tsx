import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Pressable, StyleSheet } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileStyle';

const Profile = ({ navigation }: any) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Recupera as informações do usuário do MONGO
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      const profileImage = await AsyncStorage.getItem('userProfileImage');

      setUserName(name);
      setUserEmail(email);
      setUserProfileImage(profileImage);
    };

    fetchUserProfile();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userProfileImage');
    navigation.navigate('Login');
  };

  const changePassword = () => {
    // Lógica para mudar a senha
  };

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
  
    launchImageLibrary(options as ImageLibraryOptions, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a escolha da imagem');
      } else if (response.errorMessage) {
        console.error('Erro ao escolher a imagem:', response.errorMessage);
      } else {
        const imageUrl = 'http://192.168.1.145:8080/api/user/uploadAvatar';
        setUserProfileImage(imageUrl);
        AsyncStorage.setItem('userProfileImage', imageUrl);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Pressable onPress={selectImage}>
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