import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from '../../httpService';

const ProfileIcon = ({ navigation }) => {
  const [userProfileImage, setUserProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          const userData = await httpService.searchByEmail(email);
          if (userData.pathAvatar) {
            setUserProfileImage(`data:image/jpeg;base64,${userData.pathAvatar}`);
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar imagem do perfil:', error);
      }
    };

    fetchUserProfileImage();
  }, [userProfileImage]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      {userProfileImage ? (
        <Image
          source={{ uri: userProfileImage }}
          style={{ width: 40, height: 40, borderRadius: 15 }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ProfileIcon;