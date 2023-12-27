import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IUser } from '../models/userSchema';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authentification requise' });
  }

  try {
    // Check if process.env.JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;

    if (!decoded || !decoded.user) {
      throw new Error('Token invalide');
    }

    req.user = decoded.user as IUser;

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error);
    res.status(401).json({ error: 'Token invalide' });
  }
};

export default verifyToken;
