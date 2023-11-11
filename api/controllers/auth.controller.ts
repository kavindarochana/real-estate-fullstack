import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";

export const register = async (req : Request, res: Response, next: NextFunction) => {
    const { name, email, password, avatar} = req.body;
    const hashedPass = bcrypt.hashSync(password, 16);
    const newUser = new User({name, email, password : hashedPass, avatar});

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

        const { password : userPass, name, _id: id } = user;

        if (!bcrypt.compareSync(password, userPass)) {
            return next(errorHandler(401, 'Invalid email or password'));
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie('access_token',token, {httpOnly: true,}).status(200).json({success: true, id, email,name});

    } catch(error) {
        next(error);
    }
}

export const googleAuth = async (req : Request, res: Response, next: NextFunction) => {

    const {email, displayName: name, photo} = req.body;

    try {
        const user = await User.findOne({email});
        
        if (user) {
            const {email: userEmail, name, _id: id } = user;
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.cookie('access_token',token, {httpOnly: true,}).status(200)
            .json({success: true, id, email: userEmail, name});
            return;
        } else {
            // Genarate random hashed password
            const password = bcrypt.hashSync(
                Math.random().toString(36).slice(-12) + Date.now(), 
                16
            );

            const newUser = new User({name, email, password});
            
            newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            res.cookie('access_token',token, {httpOnly: true,}).status(200).
            json({success: true, id: newUser._id, email,name, avatar: newUser.avatar});
    
        }

    } catch (error) {

        next(error);
    }


};