import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileStyle';
import * as ImagePicker from 'expo-image-picker';
import httpService from '../../httpService';


const Profile = ({ navigation }: any) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        
        setUserName(name);
        setUserEmail(email);

        if (email) {
          const userData = await httpService.searchByEmail(email);
          if (userData.pathAvatar) {
            setUserProfileImage(`data:image/jpeg;base64,${userData.pathAvatar}`);
          }
        }
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
    navigation.navigate(path);
  };

  const changePassword = () => {
    goTopage('forgotPassword');
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      console.log('Permissão para acessar a galeria negada');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const email = await AsyncStorage.getItem('userEmail');
      
      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        httpService.saveImageToDatabase(email, uri);
      }
    }
  };  
  
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.profileImagePlaceholder}>
          <Image style={styles.profileImage} source={{ uri: userProfileImage }} />
        </View>
        <Pressable onPress={openImagePicker} style={styles.button}>
            <Text style={styles.buttonText}>Alterar Foto</Text>
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
