export interface WalletAuthRequest {
  publicKey: string;
  signature: string;
  message: string;
}

export interface WalletAuthResponse {
  token: string;
  expiresIn: number;
}

export interface DecodedToken {
  publicKey: string;
  iat: number;
  exp: number;
}
