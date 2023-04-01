import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { verifyToken } from '../auth/authFunctions';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
  
    const isValid = verifyToken(authorization) as JwtPayload;
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid token' });
    }
   
    return next();
  } catch (error) {
    res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

export default validateToken;