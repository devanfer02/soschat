import { Request, Response} from 'express'

import Follow from '../db/models/Follow'
import { createResponse, createResponseErr } from '../helpers/response'
import status from '../helpers/status'
import { Op } from 'sequelize'
import User from '../db/models/User'

export const followUser = async (req: Request, res: Response): Promise<Response> => {
    const { followId } = req.params
    const { id } = req.session!.user

    try {
        const user = await User.findOne({
            where: {
                id
            }
        });

        if (user === null) {
            return createResponseErr(res, status.BadRequest, 'user not found', new Error('user not found'))
        }

        const follow = await User.findOne({
            where: {
                id: followId
            }
        });

        if (follow === null) {
            return createResponseErr(res, status.BadRequest, 'follow not found', new Error('follow not found'))
        }

        const relation = await Follow.findOne({
            where: {
                [Op.and]: [
                    {followerId: id},
                    {followingId: followId}
                ]
            }
        })

        if (relation !== null) {
            return createResponseErr(res, status.BadRequest, 'user already followed', new Error('followed already'))
        }

        if (followId === id) {
            return createResponseErr(res, status.BadRequest, 'cant follow self', new Error('self follow attempt'))
        }

        const record = await Follow.create({
            followerId: id,
            followingId: followId
        });

        const followingTotal = user.following! + 1
        const followersTotal = follow.followers! + 1

        await User.update({
            following: followingTotal
        }, {
            where: {
                id
            }
        });

        await User.update({
            followers: followersTotal
        }, {
            where: {
                id: followId
            }
        });

        return createResponse(res, status.Created, 'successfully follow user', record);
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const unfollowUser = async (req: Request, res: Response): Promise<Response> => {
    const { followId } = req.params
    const { id } = req.session!.user
    try {
        const user = await User.findOne({
            where: {
                id
            }
        });

        if (user === null) {
            return createResponseErr(res, status.BadRequest, 'user not found', new Error('user not found'))
        }

        const follow = await User.findOne({
            where: {
                id: followId
            }
        });

        if (follow === null) {
            return createResponseErr(res, status.BadRequest, 'follow not found', new Error('follow not found'))
        }

        await Follow.destroy({
            where:{
                [Op.and]: [
                    {followerId: id},
                    {followingId: followId}
                ]
            }
        });

        const followingTotal = user.following! - 1
        const followersTotal = follow.followers! - 1

        await User.update({
            following: followingTotal
        }, {
            where: {
                id
            }
        });

        await User.update({
            followers: followersTotal
        }, {
            where: {
                id: followId
            }
        });

        return createResponse(res, status.Created, 'successfully unfollow user');
    } catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const getFollowers = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user 
    try {
        const followers = await Follow.findAll({
            where: {
                followingId: id
            }
        });
    
        const followerIds = followers.map(follower => follower.followerId);
    
        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: followerIds
                }
            },
            attributes: {
                exclude: ['password']
            }
        });

        return createResponse(res, status.Ok, 'successfully fetch followers', users);        
    }  catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}

export const getFollowings = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.session!.user 
    try {
        const followings = await Follow.findAll({
            where: {
                followerId: id
            }
        });
    
        const followingIds = followings.map(following => following.followingId);
    
        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: followingIds
                }
            },
            attributes: {
                exclude: ['password']
            }
        });

        return createResponse(res, status.Ok, 'successfully fetch followings', users);        
    }  catch (error) {
        return createResponseErr(res, status.ServerError, 'internal server error', error as Error)
    }
}
