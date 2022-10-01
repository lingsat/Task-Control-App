export interface AuthResponseData {
  jwt_token: string;
  userId: string;
  email: string;
  login: string;
}

export interface RegistrationResponseData {
  message: string;
}