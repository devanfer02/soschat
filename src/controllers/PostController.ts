import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import Post from "../db/models/Post";
import { createResponse, createResponseErr } from "../helpers/response"
import status from "../helpers/status";
import Follow from "../db/models/Follow";
import { Op } from "sequelize";
import firebaseConfig from "../config/firebase.config";
import User from "../db/models/User";
import { deleteFile, uploadToFirebase } from "../helpers/firebase";

initializeApp(firebaseConfig);

const storage = getStorage();

export const getAllPosts = async (req: Request, res: Response): Promise<Response> => {    
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'following', 'followers', 'email']
                },
                as: 'user'

            }
        });

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
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'following', 'followers', 'email']
                },
                as: 'user'
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
        if (req.file! === undefined) {
            const posts = await Post.create({id, userId, ...req.body});

            return createResponse(res, status.Created, "successfully create new post", posts);            
        }

        const downloadUrl = await uploadToFirebase(req, storage, 'posts');

        const post = {id, userId, ...req.body, image: downloadUrl};

        const posts = await Post.create(post);

        return createResponse(res, status.Created, "successfully create new post", posts);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const updatePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userId = req.session!.user.id;

    try {
        const post = await Post.findOne({
            where: {
                id, userId
            }
        });

        if (post === null) {
            return createResponse(res, status.NoContent, 'post not found');
        }

        if (req.file! === undefined) {
            await Post.update(req.body , {
                where: {
                    id
                }
            });
    
            return createResponse(res, status.Created, 'successfully update post');
        }

        if (post.image !== null && post.image !== undefined) {
            await deleteFile(storage, post.image);
        }

        const downloadUrl = await uploadToFirebase(req, storage, 'posts');

        await Post.update({...req.body, image: downloadUrl} , {
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
    const userId = req.session!.user.id;

    try {
        const post = await Post.findOne({
            where: {
                id, userId
            }
        });

        if (post === null) {
            return createResponseErr(
                res, status.Forbidden, 'cannot delete post', new Error("forbidden to delete other's user post"
            ));
        }

        if (post.image !== null && post.image !== undefined) {
            await deleteFile(storage, post.image);
        }

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