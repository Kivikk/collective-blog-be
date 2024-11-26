import { Router } from 'express';

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    deleteProfile,
} from '../controllers/users.js';
import { authenticate } from '../middleware/authenticate.js';

export const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);

userRouter
    .route('/profile')
    .get(authenticate, getProfile)
    .put(authenticate, updateProfile)
    .delete(authenticate, deleteProfile);

userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
