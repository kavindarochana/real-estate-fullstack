import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import { Errors } from 'types';

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log('Connected to DB');
}).catch((error: Error) => {
    console.log('DB Error ', error);
});

const app = express();

app.use(cookieParser());
// Allow json Input
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is started on port 3000');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Middlewares

// Global Error handler
app.use((err: Errors , req: Request, res: Response, next: NextFunction) => {
    const statusCode = err?.statusCode || 500;
    const message = err.message || 'Your request can\'t be process right now.';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});

