// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userSchema';

export const registerUser = async(req: Request, res: Response): Promise <void> => {
    const { username, email, password ,location,phone} = req.body;
    
    

    try {
       const userE = await User.findOne({ email: req.body.email });
        if (userE) {  res.status(401).json("email is unique")
        return;
    };
        const salt = await bcrypt.genSalt(10);

        // Utilisez le sel pour hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: IUser = new User({
            username,
            email,
            location,
            phone,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json({"message":"user register success",data:user});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: 'Invalid credentials' });
    return ;
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({"message":"Login success", token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
