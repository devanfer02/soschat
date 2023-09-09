import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import Post from "../db/models/Post";
import { createResponse } from "../config/utils"

export const getAllPosts = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const record = await Post.findAll();

        return createResponse(res, 200, "successfully fetch data", record);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error');
    }
}

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    const id = uuidv4();
    try {
        const userId = req.session!.userId
        
        const record = await Post.create({...req.body, id, userId});

        req.session!.userId = undefined;
        return createResponse(res, 201, "successfully create new post", record);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error');
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

        return createResponse(res, 201, 'successfully update post');
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error');
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

        return createResponse(res, 201, 'successfully deleted post');
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, 'internal server error');
    }
}