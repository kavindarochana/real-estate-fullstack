

import { verifyUser } from "../utils/verifyUser";
import { hello, updateUser, deleteUser } from "../controllers/user.controller";
import express from "express";


const userRouter = express.Router();

userRouter.get('/hello', hello);
userRouter.post('/update/:id', verifyUser, updateUser);
userRouter.delete('/update/:id', verifyUser, deleteUser);


export default userRouter;