import { Request, Response, NextFunction } from 'express';
import { createResponse } from '../config/utils';
import { jwtKey } from '../config/env.variables';
import jwt from 'jsonwebtoken';

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session === undefined) {
        return createResponse(res, 401, 'unauthorized');
    }

    const token = req.session.token;

    if (token === undefined) {
        return createResponse(res, 401, 'unauthorized');
    }

    try {
        const decodedToken = jwt.verify(token, jwtKey) as {userId?: string};
        
        if (decodedToken.userId === undefined) {
            return createResponse(res, 401, 'unauthorized');
        }
        
        
        req.session.userId = decodedToken.userId;
        next();
    } catch (error) {
        return createResponse(res, 500, 'internal server error');
    }
}