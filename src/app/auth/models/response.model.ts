export interface AuthResponseData {
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  kind?: string;
  registered?: boolean;
}