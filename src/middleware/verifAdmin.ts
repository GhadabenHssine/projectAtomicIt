import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/userSchema';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

const verifAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    
    if (!req.user || !req.user.superAdmin) {
      return res.status(403).json({ error: 'Accès interdit. Rôle d\'administrateur requis.' });
    }
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du rôle d\'administrateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export default verifAdmin;
