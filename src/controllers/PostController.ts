import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import Post from "../db/models/Post";
import { createResponse, createResponseErr } from "../helpers/response"
import status from "../helpers/status";

export const getAllPosts = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const posts = await Post.findAll();

        return createResponse(res, status.Ok, "successfully fetch data", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const getFollowedPost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user
    try {
        return createResponse(res, status.Ok, "successfully fetch data", null);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    const id = uuidv4();
    const { userId } = req.session!.user
    try {
        const posts = await Post.create({...req.body, id, userId});

        return createResponse(res, status.Created, "successfully create new post", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const updatePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, desc } = req.body;

    try {
        const post = await Post.findByPk(id);

        if (post === null) {
            return createResponse(res, 409, 'post not found');
        }

        const updatedPost = {
            id: post.id,
            userId: post.userId,
            title: title === undefined? post.title : title,
            desc: desc === undefined? post.desc : desc
        }

        await Post.update({...updatedPost},{
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