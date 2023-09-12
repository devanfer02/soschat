import jwt from 'jsonwebtoken';
import env from '../config/env';

interface InfoToken {
    payload: string | jwt.JwtPayload | null
    expired: boolean | string
}

export const generateToken = (data: string | object): string => {
    const token = jwt.sign(data, env.jwtToken, {
        expiresIn: '4h'
    });

    return token;
}

export const verifyToken = (token: string): InfoToken => {
    try {
        const decoded = jwt.verify(token, env.jwtToken)
        
        const info: InfoToken = {
            payload: decoded,
            expired: false
        }

        return info;
    } catch (error) {
        const info: InfoToken = {
            payload: null,
            expired: (error as Error).message.includes("jwt expired")
        }
        return info;
    }
}

