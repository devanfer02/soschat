import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';

import User from "../db/models/User";
import status from "../helpers/status";
import { createResponse, createResponseErr } from "../helpers/response";
import { hashPassword, comparePassword } from "../helpers/bcrypt";
import env from "../config/env";
import { generateToken, verifyToken } from "../helpers/jwt";

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const id = uuidv4();
    const { fullname, username, password, email } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email}, {username}
                ]
            }
        });
        

        if (user !== null) {
            return createResponse(res, status.Conflict, 'email or username already exist');
        }

        const hashedPassword = await hashPassword(password);
        
        await User.create({
            id,
            fullname,
            username,
            password: hashedPassword,
            email
        });
        
        return createResponse(res, status.Created, 'user registered');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: { username }
        });

        if (user === null) {
            return createResponse(res, status.Unauthorized, 'invalid user or password');
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return createResponse(res, status.Unauthorized, 'invalid user or password');
        }

        const token = generateToken({id: user.id, fullname: user.fullname, email: user.email});
        res.cookie("accessToken", token, {
            maxAge: 30000,
            httpOnly: true 
        })

        return createResponse(res, status.Ok, 'user successfully login');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}

export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.cookie("accessToken", undefined, {
            maxAge: 0,
            httpOnly: true
        })

        return createResponse(res, status.Ok, 'user successfully logout');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}