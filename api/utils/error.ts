import { Errors } from "types";

export const errorHandler = (statusCode: any, message: string) => {
    const error : Errors = new Error();
    error.statusCode = statusCode;
    error.message = message;
    error.success = false;
    return error;
};