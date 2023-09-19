import express from 'express';
import { requireUser } from '../middlewares/Auth';
import {
    createChainComment,
    createPostComment,
    deleteComment,
    getChainedComments,
    getPostComments 
} from '../controllers/CommentController';
import { commentValidator, genericValidator } from '../validators/validator.class';
import { validatorHandler } from '../validators/validator.handler';

const router = express.Router();

router.get(
    '/api/comments/post/:postId',
    getPostComments
);

router.get(
    '/api/comments/reply/:commentId',
    getChainedComments
);

router.post(
    '/api/comments/post/:postId',
    commentValidator.validateCreateComment(),
    validatorHandler,
    requireUser,
    createPostComment
);

router.post(
    '/api/comments/reply/:commentId',
    commentValidator.validateCreateComment(),
    validatorHandler,
    requireUser,
    createChainComment
);

router.delete(
    '/api/comments/:id',
    requireUser,
    deleteComment
);

export default router;