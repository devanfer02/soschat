import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import Post from "../db/models/Post";
import { createResponse, createResponseErr } from "../helpers/response"
import status from "../helpers/status";
import Follow from "../db/models/Follow";
import { Op } from "sequelize";

export const getAllPosts = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const posts = await Post.findAll();

        return createResponse(res, status.Ok, "successfully fetch posts", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const getUserPosts = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user
    try {
        const posts = await Post.findAll({
            where: {
                userId: id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return createResponse(res, status.Ok, "successfully fetch user posts", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const getFollowedPost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user
    try {
        const followings = await Follow.findAll({
            where: {
                followerId: id
            }
        });

        const followingIds = followings.map((following => following.followingId))

        const posts = await Post.findAll({
            where: {
                userId: {
                    [Op.in]: followingIds
                }
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return createResponse(res, status.Ok, "successfully fetch following's post", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    const id = uuidv4();
    const userId = req.session!.user.id
    try {
        const posts = await Post.create({...req.body, id, userId});

        return createResponse(res, status.Created, "successfully create new post", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const updatePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);

        if (post === null) {
            return createResponse(res, status.NoContent, 'post not found');
        }

        await Post.update(req.body , {
            where: {
                id
            }
        });

        return createResponse(res, status.Created, 'successfully update post');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        await Post.destroy({
            where: {
                id
            }
        });

        return createResponse(res, status.Ok, 'successfully deleted post');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}