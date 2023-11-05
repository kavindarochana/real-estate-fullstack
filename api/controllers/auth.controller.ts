import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const register = async (req : Request, res: Response) => {
    const { username, email, password} = req.body;
    const hashedPass = bcrypt.hashSync(password, 16);
    const newUser = new User({username, email, password : hashedPass});

    try {
        await newUser.save();

        res.status(201).json('User created');
    } catch (error ){
        res.status(500).json(error.message);
    }
    

}