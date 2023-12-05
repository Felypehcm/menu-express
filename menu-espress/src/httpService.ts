import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://10.5.7.117:8080/api';

const httpService = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      return response;
    } catch (error) {
      console.error('Erro ao fazer a solicitação de login:', error);
      throw error;
    };
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      return response;
    } catch (error) {
      console.error('Erro ao fazer a solicitação de cadastro:', error);
      throw error;
    };
  }
};

export default httpService;
