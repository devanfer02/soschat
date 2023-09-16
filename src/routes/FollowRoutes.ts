import express from 'express'
import {
    followUser,
    getFollowers,
    getFollowings,
    unfollowUser
} from '../controllers/FollowController'
import { requireUser } from '../middlewares/Auth';

const router = express.Router();

router.get(
    '/api/followers',
    requireUser,
    getFollowers
);

router.get(
    '/api/followings',
    requireUser,
    getFollowings
);

router.post(
    '/api/follow/:followId',
    requireUser,
    followUser
);

router.delete(
    '/api/follow/:followId',
    requireUser,
    unfollowUser
);

export default router;