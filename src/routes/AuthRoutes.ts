import express from 'express';
import { userValidator } from '../validators/validator.class';
import { validatorHandler } from '../validators/validator.handler';
import {
    registerUser,
    loginUser
} from '../controllers/AuthController';
import { authValidation } from '../middlewares/Auth';

const router = express.Router();

router.post(
    '/api/register', 
    userValidator.checkUserRegisterForm(), 
    validatorHandler,
    registerUser
);

router.use(authValidation).post(
    '/api/login',
    userValidator.checkUserLoginForm(),
    validatorHandler,
    loginUser
);

export default router;