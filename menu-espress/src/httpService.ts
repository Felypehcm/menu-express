interface Credentials {
  email: string;
  password: string;
}

const httpService = {
  login: async (credentials: Credentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      return response;
    } catch (error) {
      console.error('Erro ao fazer a solicitação de login:', error);
      throw error;
    }
  },
};

export default httpService;
