
import { Request, Response, NextFunction } from 'express';

export const validateUsername = (req: Request, res: Response, next: NextFunction): void => {
  const { username } = req.body;
  

  if (!username || username.length<3) {
   res.status(400).json({ error: 'Username must be at least 6 characters long' });
   return;
  }

  next();
};

export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.match(emailRegex)) {
  res.status(400).json({ error: 'Invalid email address' });
  return ;
  }

  next();
};

export const validatePassword = (req: Request, res: Response, next: NextFunction): void => {
  const { password } = req.body;

  if (!password || password.length < 8) {
     res.status(400).json({ error: 'Password must be at least 8 characters long' });
     return;
  }

  next();
};


export const validatePhone = (req: Request, res: Response, next: NextFunction): void => {
  const { phone } = req.body;

  if (!phone) {
     res.status(400).json({ error: 'Phone is required' });
     return;
  }

  next();
};

export const validateLocation = (req: Request, res: Response, next: NextFunction): void => {
  const { location} = req.body;

  if (!location) {
     res.status(400).json({ error: 'location is required' });
     return;
  }

  next();
};