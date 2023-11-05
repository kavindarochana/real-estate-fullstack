import express, { Request, Response } from "express";


const userRouter = express.Router();

userRouter.get('/hello', (req: Request, res : Response) =>{
    res.json({
        message: "Hello World"
    });
});


export default userRouter;