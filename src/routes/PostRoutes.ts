import express from 'express';
import { postValidator } from '../validators/validator.class';
import { validatorHandler } from '../validators/validator.handler';
import {
    getAllPosts,
    createPost,
    deletePost,
    updatePost
} from '../controllers/PostController'
import { authValidation } from '../middlewares/Auth';

const router = express.Router();

router.get(
    '/api/posts',
    getAllPosts
);

router.post(
    '/api/posts',
    authValidation,
    postValidator.checkPostForm(), 
    validatorHandler,
    createPost
);

router.patch(
    '/api/posts/:id',
    authValidation,
    postValidator.checkPostId(),
    validatorHandler,
    updatePost
);

router.delete(
    '/api/posts/:id',
    authValidation,
    postValidator.checkPostId(),
    validatorHandler,
    deletePost
);

export default router;