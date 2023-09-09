import express from 'express';
import { getAllUsers, getUserByUsername } from '../controllers/UserController';

const router = express.Router();

router.get('/api/users', getAllUsers);
router.get('/api/users/:username', getUserByUsername);

export default router;