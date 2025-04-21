import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}

export function authMiddleware(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET as string);
        (req as any).user = decoded;
        
        return handler(req, res);
      } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
    } catch (err) {
      console.error('Auth Middleware Error:', err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
} 