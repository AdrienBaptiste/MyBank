import axios from '../api/axios';

export const loginRequest = async (email: string, password: string): Promise<string> => {
  const response = await axios.post('/api/login', { email, password });
  return response.data.token;
};

export const registerRequest = async (name: string, email: string, password: string): Promise<void> => {
  await axios.post('/api/register', { name, email, password });
};
