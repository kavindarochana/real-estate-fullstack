import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log('Connected to DB');
}).catch((error: Error) => {
    console.log('DB Error ', error);
});

const app = express();

// Allow json Input
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is started on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);