import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

export const validatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); 

    if (errors.isEmpty()) {
        next();
        return;
    } 

    return res.status(400).json(
        {
            status: 400,
            message: 'bad request',
            errors: errors.array()
        }
    );
};