import { Request, Response, NextFunction } from 'express';
import status from '../helpers/status';
import { verifyToken } from '../helpers/jwt';

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    
    if (!accessToken) {
        return res.sendStatus(status.Unauthorized);
    }

    const { payload } = verifyToken(accessToken);

    if (!payload) {
        return res.sendStatus(status.Unauthorized);
    }

    req.session!.user = payload;
    next();
}