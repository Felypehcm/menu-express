import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Pressable, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      {userProfileImage && (
        <Image style={styles.profileImage} source={{ uri: userProfileImage }} />
      )}
      <Text style={styles.text}>Nome: {userName}</Text>
      <Text style={styles.text}>Email: {userEmail}</Text>

      <Pressable onPress={changePassword} style={styles.button}>
        <Text style={styles.buttonText}>Mudar Senha</Text>
      </Pressable>

      <Pressable onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>Sair do Aplicativo</Text>
      </Pressable>
    </View>
  );
};

export default Profile;