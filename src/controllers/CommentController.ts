import { Request, Response } from "express";
import { v4 as uuid } from 'uuid'

import Comment from "../db/models/Comment";
import Post from "../db/models/Post";
import { createResponse, createResponseErr } from "../helpers/response";
import status from "../helpers/status";
import User from "../db/models/User";

export const createPostComment = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.session!.user.id;
    const id = uuid();

    try {
        const post = await Post.findByPk(postId);

        if (post === null) {
            return createResponseErr(
                res, status.NotFound, 'comment id not found', new Error(`Comment by id ${postId} not found`
            ));
        }

        const totalComments = post.comments! + 1;
        const comment = {
            id, userId, postId, content
        }   

        const record = await Comment.create(comment);
        await Post.update({
            comments: totalComments,
        }, {
            where: {
                id: postId
            }
        })

        return createResponse(res, status.Created, 'successfully create comment', record);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}

export const createChainComment = async (req: Request, res: Response): Promise<Response> => {
    const { content } = req.body;
    const { commentId } = req.params;
    const userId = req.session!.user.id;
    const id = uuid();

    try {
        const comment = await Comment.findByPk(commentId);

        if (comment === null) {
            return createResponseErr(
                res, status.NotFound, 'comment id not found', new Error(`Comment by id ${commentId} not found`
            ));
        }

        const { postId } = comment;
        const totalChained = comment.totalChained! + 1
        const chained = {
            id, userId, postId, commentId, content
        }

        const record = await Comment.create(chained);
        await Comment.update({
            totalChained
        }, {
            where: {
                id: commentId
            }
        })

        return createResponse(res, status.Created, 'successfully create chained comment', record);

    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userId = req.session!.user.id;
    try {   
        const comment = await Comment.findOne({
            where: {
                id, userId
            }
        });

        if (comment === null) {
            return createResponseErr(
                res, status.Unauthorized, 'cannot delete comment', new Error("forbidden to delete other's user comment")
            );
        }

        const post = await Post.findByPk(comment.postId);

        if (post === null) {
            return createResponseErr(
                res, status.Forbidden, 'cannot delete comment', new Error("post is null")
            );
        }

        const totalComments = post.comments! - 1;
        await Comment.destroy({
            where: {
                id
            }
        });
        await Post.update({
            comments: totalComments
        }, {
            where: {
                id: comment.postId
            }
        })

        return createResponse(res, status.Ok, 'successfully delete comment');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}

export const getPostComments = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params;

    try {
        const comments = await Comment.findAll({
            where: {
                postId
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'following', 'followers', 'email']
                },
                as: 'user'
            }
        });

        return createResponse(res, status.Ok, 'successfully fetch post comments', comments);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}

export const getChainedComments = async (req: Request, res: Response): Promise<Response> => {
    const { commentId } = req.params;

    try {
        const comments = await Comment.findAll({
            where: {
                commentId
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['password']
                },
                as: 'user'
            }
        });

        return createResponse(res, status.Ok, 'successfully fetch chained comments', comments);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error);
    }
}