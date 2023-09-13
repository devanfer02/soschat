import jwt from 'jsonwebtoken';

export interface InfoToken {
    payload: string | jwt.JwtPayload | null
    expired: boolean
}

export const generateToken = (data: string | object, expiresIn: string, secret_token: string): string => {
    const token = jwt.sign(data, secret_token, {
        expiresIn
    });

    return token;
}

export const verifyToken = (token: string, secret_token: string): InfoToken => {
    try {
        const decoded = jwt.verify(token, secret_token);
        
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

