const BASE_URL = 'http://10.5.7.212:8080/api';
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
  },

  updatePassword: async (email: string, password: string, newPassword: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/updatePassword`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, newPassword }),
      });
      return response;
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      throw error;
    };
  }
};

export default httpService;
