import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error";

export const register = async (req : Request, res: Response, next: NextFunction) => {
    const { username, email, password} = req.body;
    const hashedPass = bcrypt.hashSync(password, 16);
    const newUser = new User({username, email, password : hashedPass});

    try {
        await newUser.save();
        res.status(201).json('User created');
    } catch (error ){
       next(errorHandler(500, 'System Failure'));
    }
    

}