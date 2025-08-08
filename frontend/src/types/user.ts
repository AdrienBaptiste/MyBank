export interface DecodedToken {
  id: number;
  email: string;
  name: string;
  exp: number;
  iat: number;
}