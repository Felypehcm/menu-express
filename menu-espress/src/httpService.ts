const httpService = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch('http://192.168.0.13:8080/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}),
      });

      return response;
    } catch (error) {
      console.error('Erro ao fazer a solicitação de login:', error);
      throw error;
    }
  },
};

export default httpService;
