

import { hello } from "../controllers/user.controller";
import express from "express";


const userRouter = express.Router();

userRouter.get('/hello', hello);


export default userRouter;