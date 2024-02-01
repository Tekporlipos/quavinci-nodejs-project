import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'class-validator';
import { HttpError } from 'http-errors';
import {logErrors} from "./logRequests";
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log unexpected errors
    if (err)
    logErrors(err,req,res,next);
    next();
};