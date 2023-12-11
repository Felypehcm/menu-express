const BASE_URL = 'http://192.168.1.8:8080/api';

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
  },

  saveImageToDatabase: async (email: string, uri: string) => {
    try {
      const formData = new FormData();

      const file = {
        uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      };
      formData.append('avatar', file);
      formData.append('email', email);

      const saveResponse = await fetch(`${BASE_URL}/user/uploadAvatar`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await saveResponse.json();
      console.log('Imagem salva no banco de dados:', data);
    } catch (error) {
      console.error('Erro ao salvar imagem no banco de dados:', error);
    }
  },

  searchByEmail: async (email: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/findByEmail/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return {};
    } catch (error) {
      console.error('Erro na busca por email:', error);
      return {};
    }
  },

  getLancheHome: async () => {
    try {
      return await fetch(`${BASE_URL}/product/findAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        // body: JSON.stringify({productType: 'Lanche'})
      });
    } catch (error) {
      console.error('Erro na busca por produto', error);
    }
  },

  addOrder: async (email: string, order: any) => {
    try {
      const response = await fetch(`${BASE_URL}/user/order`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, order }),
      });

      return response;
    } catch (error) {
      console.error('Erro na busca por pedidos', error);
      throw error; // Re-throw para que o chamador saiba que houve um erro
    }
  }
};

export default httpService;