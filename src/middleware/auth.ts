import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  username: string;
}

interface NextApiRequestWithUser extends NextApiRequest {
  user: DecodedToken;
}

export function authMiddleware(
  handler: (req: NextApiRequestWithUser, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      
      // Add user info to request
      req.user = decoded;
      
      // Continue to the actual API route handler
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
} 