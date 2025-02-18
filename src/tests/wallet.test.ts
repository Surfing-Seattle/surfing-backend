import { WalletService } from '../services/wallet.service';
import { JWTService } from '../services/jwt.service';

describe('Wallet Authentication', () => {
  describe('WalletService', () => {
    it('should generate a valid auth message', () => {
      const publicKey = 'test-public-key';
      const message = WalletService.generateAuthMessage(publicKey);
      
      expect(message).toContain(publicKey);
      expect(message).toContain('Sign this message');
    });

    // Add more wallet service tests
  });

  describe('JWTService', () => {
    it('should generate and verify a valid token', () => {
      const publicKey = 'test-public-key';
      const token = JWTService.generateToken(publicKey);
      const decoded = JWTService.verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(decoded?.publicKey).toBe(publicKey);
    });

    // Add more JWT service tests
  });
});
