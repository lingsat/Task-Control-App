export interface AuthResponseData {
  jwt_token: string;
  userId: string;
  email: string;
}

export interface RegistrationResponseData {
  message: string;
}