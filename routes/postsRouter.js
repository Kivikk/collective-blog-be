import { Router } from 'express';
import { checkIfPostExists } from '../middleware/checkPost.js';
import { authenticate } from '../middleware/index.js';

import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/posts.js';

export const postsRouter = Router();

postsRouter.route('/').get(getPosts).post(authenticate, createPost);
postsRouter
    .route('/:id')
    .get(checkIfPostExists, getPostById)
    .put(checkIfPostExists, authenticate, updatePost)
    .delete(checkIfPostExists, authenticate, deletePost);
