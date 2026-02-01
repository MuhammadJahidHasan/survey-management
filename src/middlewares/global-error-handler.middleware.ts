import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error(`Error caught by global handler:`, err);

    const statusCode = err.isCustomError ? err.statusCode : 500;
    const errorMessage = statusCode === 500 || !err.message ? 'Internal Server Error' : err.message;


    return res.status(statusCode).send({
        message: errorMessage,
        data: null,
        errors: err.isCustomError && err.errors ? err.errors : [errorMessage],
    });
};
