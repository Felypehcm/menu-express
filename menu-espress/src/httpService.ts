const BASE_URL = 'http://10.5.3.127:8080/api';

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

  searchByEmail: async (email: string): Promise<{ avatar?: string }> => {
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
  
  getLancheHome: async (productType: string) => {
    try {
      const response = await fetch(`${BASE_URL}/product/findByType/:typeProduct`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({productType}),
      });
      return response;
    } catch (error) {
      console.error('Erro ao exibir os lanches:', error);
      throw error;
    };
  },
};

export default httpService;
