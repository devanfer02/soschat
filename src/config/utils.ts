import { Response } from "express"
import bcrypt from 'bcrypt';

import { saltRounds } from "./env.variables";

interface ApiResponse<T> {
    status: number,
    message: string,
    data? : T,
}

export const createResponse = <T>(res: Response, status: number, message: string, data?: T): Response => {
    const response: ApiResponse<T> = {
        status,
        message,
    };

    if (data !== undefined) response.data = data;

    return res.status(status).json(response);
};

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);

        return hash;
    } catch (error) {
        console.log(error);
        throw new Error('error hashing password');
    }
};

export const comparePassword = async (formPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(formPassword, hashedPassword);

        return match;        
    } catch (error) {
        throw new Error('error comparing password');
    }
};