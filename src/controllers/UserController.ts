import { Request, Response } from 'express';
import User from "../db/models/User";
import { createResponse, createResponseErr } from '../helpers/response';
import Post from '../db/models/Post';
import status from '../helpers/status';
import { hashPassword } from '../helpers/bcrypt';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        return createResponse(res, status.Ok, 'successfully fetch users', users);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
};

export const getUserByUsername = async (req: Request, res: Response): Promise<Response> => {
    const { username } = req.params;
    try {
        const user = await User.findOne({
            where: {
                username
            },
            include: {
                model: Post,
                as: 'user_posts'
            },
            attributes: {
                exclude: ['password']
            }
        });

        if (user === null) {
            return createResponse(res, status.NoContent, 'user not found');
        };

        return createResponse(res, status.Ok, 'successfully fetch user', user);
    } catch (error) {
        return createResponse(res, status.ServerError, 'internal server error');
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user
    const { fullname, username, email, password } = req.body
    try {
        const updatedValue = {
            fullname, username, email, password
        };

        if (password !== undefined) {
            const hashed = await hashPassword(password)
            updatedValue.password = hashed
        }

        const result = await User.update( updatedValue, {
            where: {
                id
            }
        });

        if (result[0] === 0) {
            return createResponseErr(res, status.BadRequest, 'failed to update data', new Error('data doesnt exist'))
        }

        return createResponse(res, status.Ok, 'successfully update user data')
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user
    try {
        await User.destroy({
            where: {
                id
            }
        })

        return createResponse(res, status.Ok, 'successfully delete user data')
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}