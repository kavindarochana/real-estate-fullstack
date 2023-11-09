import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";

export const register = async (req : Request, res: Response, next: NextFunction) => {
    const { username, email, password} = req.body;
    const hashedPass = bcrypt.hashSync(password, 16);
    const newUser = new User({username, email, password : hashedPass});

    try {
        await newUser.save();
        res.status(201).json({success : true, message: 'User created' });
    } catch (error ){
       next(error);
    }

}

export const login = async (req : Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(errorHandler(401, 'Invalid email or password'));
        }

        const { password : userPass, username, _id: id } = user;

        const isValidPass = bcrypt.compareSync(password, userPass);

        if (!isValidPass) {
            return next(errorHandler(401, 'Invalid email or password'));
        }


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie('access_token',token, {httpOnly: true,}).status(200).json({id, email,username});

    } catch(error) {
        next(error);
    }
}