import express from 'express';
import { userValidator } from '../validators/validator.class';
import { validatorHandler } from '../validators/validator.handler';
import {
    registerUser,
    loginUser,
    logoutUser
} from '../controllers/AuthController';

const router = express.Router();

router.post(
    '/api/auth/register', 
    userValidator.checkUserRegisterForm(), 
    validatorHandler,
    registerUser,
);

router.post(
    '/api/auth/login',
    userValidator.checkUserLoginForm(),
    validatorHandler,
    loginUser,
);

router.post(
    '/api/auth/logout',
    logoutUser
)

export default router;