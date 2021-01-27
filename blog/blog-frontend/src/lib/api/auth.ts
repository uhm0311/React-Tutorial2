import client from './client';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  username: string;
}

export const login = ({ username, password }: AuthRequest) => {
  return client.post<AuthResponse>('/api/auth/login', { username, password });
};

export const register = ({ username, password }: AuthRequest) => {
  return client.post<AuthResponse>('/api/auth/register', {
    username,
    password,
  });
};

export const check = () => client.get<AuthResponse>('/api/auth/check');

export const logout = () => client.post<void>('/api/auth/logout');
