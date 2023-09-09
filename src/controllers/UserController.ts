import { Request, Response } from 'express';
import User from "../db/models/User";
import { createResponse } from '../config/utils';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.findAll();

        return createResponse(res, 200, 'successfully fetch users', users);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error', );
    }
};

export const getUserByUsername = async (req: Request, res: Response): Promise<Response> => {
    const { username } = req.params;
    try {
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (user === null) {
            return createResponse(res, 404, 'user not found');
        };

        return createResponse(res, 200, 'successfully fetch user', user);
    } catch (error) {
        return createResponse(res, 500, 'internal server error');
    }
};

