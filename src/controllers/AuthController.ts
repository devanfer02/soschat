import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import validator from "validator";

import { comparePassword, createResponse, hashPassword } from "../config/utils";
import User from "../db/models/User";
import { jwtKey } from "../config/env.variables";

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const id = uuidv4();

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email: req.body.email},
                    {username: req.body.username}
                ]
            }
        });

        if (user !== null) {
            return createResponse(res, 409, 'email or username already exist');
        }

        const hashedPassword = await hashPassword(req.body.password);
        await User.create({
            id,
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        
        return createResponse(res, 201, 'user registered');
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error');
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user === null) {
            return createResponse(res, 404, 'user or password doesnt match');
        }

        const passwordMatch = await comparePassword(req.body.password, user.password);

        if (!passwordMatch) {
            return createResponse(res, 404, 'user or password doesnt match');
        }

        const token = jwt.sign({ userId: user.id }, jwtKey, {
            expiresIn: '3h'
        });

        if (req.session === undefined) {
            throw new Error('req.session is undefined');
        }

        req.session.token! = token;

        return createResponse(res, 200, 'user successfully login');
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error');
    }
}