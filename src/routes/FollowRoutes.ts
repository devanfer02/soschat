import express from 'express'
import {
    followUser,
    unfollowUser
} from '../controllers/FollowController'
import { requireUser } from '../middlewares/Auth';

const router = express.Router();

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