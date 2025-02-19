import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";
import {ResponseError} from "../error/response-error";

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).json({
            errors: `Validation Error: ${JSON.stringify(err)}`,
        });
    } else if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            errors: err.statusMessage
        });
    } else {
        res.status(500).json({
            errors: err.message
        })
    }
}