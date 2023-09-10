import bcrypt from 'bcrypt';

import env from "../config/env.variables";

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hash = await bcrypt.hash(password, env.saltRounds);

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