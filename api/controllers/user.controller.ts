import express, { Request, Response } from "express";


export const hello = (req: Request, res : Response) => {
    res.json({
        message: "Hello World"
    });
};