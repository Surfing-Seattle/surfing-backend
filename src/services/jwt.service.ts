import jwt from 'jsonwebtoken';
import { DecodedToken } from '../types/wallet.types';

export class JWTService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly TOKEN_EXPIRY = '24h';

  /**
   * Generate a JWT token for a wallet address
   * @param publicKey wallet public key
   * @returns JWT token
   */
  static generateToken(publicKey: string): string {
    return jwt.sign(
      { publicKey },
      this.JWT_SECRET,
      { expiresIn: this.TOKEN_EXPIRY }
    );
  }

  /**
   * Verify and decode a JWT token
   * @param token JWT token
   * @returns decoded token payload or null if invalid
   */
  static verifyToken(token: string): DecodedToken | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as DecodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }

  /**
   * Extract token from Authorization header
   * @param authHeader Authorization header value
   * @returns token or null if not found
   */
  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}
