import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../services/jwt.service';

export interface AuthenticatedRequest extends Request {
  user?: {
    publicKey: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = JWTService.extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decoded = JWTService.verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    // Add user data to request
    req.user = {
      publicKey: decoded.publicKey
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};
