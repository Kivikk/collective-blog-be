import { Router } from 'express';
import { checkIfUserExists } from '../middleware/checkUser.js';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/users.js';

export const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter
    .route('/:id')
    .get(checkIfUserExists, getUserById)
    .put(checkIfUserExists, updateUser)
    .delete(checkIfUserExists, deleteUser);
