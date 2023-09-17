import express from 'express';
import multer from 'multer';
import { genericValidator, postValidator } from '../validators/validator.class';
import { validatorHandler } from '../validators/validator.handler';
import {
    getAllPosts,
    createPost,
    deletePost,
    updatePost,
    getFollowedPost,
    getUserPosts
} from '../controllers/PostController'
import { requireUser } from '../middlewares/Auth';

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.get(
    '/api/posts',
    getAllPosts
);

router.get(
    '/api/posts/feed',
    requireUser,
    getFollowedPost
);

router.get(
    '/api/posts/my',
    requireUser,
    getUserPosts
);

router.post(
    '/api/posts',
    requireUser,
    upload.single('filename'),
    postValidator.validateCreateForm(), 
    validatorHandler,
    createPost
);

router.patch(
    '/api/posts/:id',
    requireUser,
    upload.single('filename'),
    genericValidator.validateParam('id'),
    validatorHandler,
    updatePost
);

router.delete(
    '/api/posts/:id',
    requireUser,
    genericValidator.validateParam('id'),
    validatorHandler,
    deletePost
);

export default router;