import express from 'express';
import {
    getAllUsers,
    getUserByUsername,
    searchUser,
    updateUser,
    deleteUser
} from '../controllers/UserController';
import { genericValidator, userValidator } from '../validators/validator.class';
import { validatorHandler } from '../validators/validator.handler';
import { requireUser } from '../middlewares/Auth';

const router = express.Router();

router.get('/api/users', getAllUsers);

router.get(
    '/api/users/:username',
    genericValidator.validateParam('username'),
    validatorHandler,
    getUserByUsername
);

router.get(
    '/api/users/search/:search',
    genericValidator.validateParam('search'),
    validatorHandler,
    searchUser
)

router.patch(
    '/api/users',
    requireUser,
    userValidator.validateUpdateForm(),
    validatorHandler,
    updateUser
);
router.delete(
    '/api/users',
    requireUser,
    deleteUser
)

export default router;