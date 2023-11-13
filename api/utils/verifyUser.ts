import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { errorHandler } from "./error";
import { User } from "types";

export const verifyUser = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (error: Error, user: User) => {
        if (error) {
            return next(errorHandler(403, 'Unauthorized'));
        }

        req.user = user;
        next();
    });

};