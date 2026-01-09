export interface User {
  id: string;
  name: string;
  email: string;
  city?: string;
  prefecture?: string;
  farmSize?: string;
  cropTypes?: string[];
  farmingMethods?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  city?: string;
  prefecture?: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
