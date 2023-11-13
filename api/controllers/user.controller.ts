import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import bcrypt from "bcrypt";
import User from "../models/user.model";


export const hello = (req: Request, res : Response) => {
    res.json({
        message: "Hello World"
    });
};

export const updateUser = async (req: any, res : Response, next: NextFunction) => {
    console.log('aaa', req.user.id, req.params.id)
    if (req?.user?.id != req.params.id) {
        return next(errorHandler(401, 'Unauthorized activity'));
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 16);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                avatar: req.body.avatar,
                password: req.body.password,
            }},
            {
                new: true
            }
        );

        const { name, email, avatar, createdAt, updatedAt } = updatedUser;

        res.status(200).json({name,email,avatar,createdAt, updatedAt});
        
    } catch (error) {
        
    }
};