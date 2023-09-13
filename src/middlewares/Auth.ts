import { Request, Response, NextFunction } from 'express';
import status from '../helpers/status';
import { verifyToken, InfoToken } from '../helpers/jwt';
import env from '../config/env';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
        return next();
    }

    const { payload, expired } = verifyToken(accessToken, env.jwtToken);

    if (!payload) {
        const refresh: InfoToken = (
            expired && refreshToken ? 
            verifyToken(refreshToken, env.refreshToken) : 
            {payload: null, expired: true}
        );

        if (!refresh.payload) {
            return next();
        }

        req.session!.user = refresh.payload;

        return next();
    }

    req.session!.user = payload;
    return next();
}

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session!.user) {
        return res.sendStatus(status.Unauthorized);
    }

    return next();
}