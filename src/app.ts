// src/app.ts
import express from 'express';
import connectDB from './database/connection';
import authRoutes from './routes/authRoutes.ts';
import dotenv from 'dotenv';
import brendRouter from './routes/brendRoutes';
import adminRouter from './routes/adminRoutes';

dotenv.config();


const app = express();


app.use(express.json());


connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/brend', brendRouter);
app.use('/api/admin', adminRouter);

export default app;
