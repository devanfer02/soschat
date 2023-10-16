import jwt from 'jsonwebtoken';

export interface InfoToken {
    payload: string | jwt.JwtPayload | null
    expired: boolean
}

export const generateToken = (data: string | object, expiresIn: string, secretToken: string): string => {
    const token = jwt.sign(data, secretToken, {
        expiresIn
    });

    return token;
}

export const verifyToken = (token: string, secretToken: string): InfoToken => {
    try {
        const decoded = jwt.verify(token, secretToken);
        
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

