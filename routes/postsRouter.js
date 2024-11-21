import { Router } from 'express';
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
    .get(getPostById)
    .put(authenticate, updatePost)
    .delete(authenticate, deletePost);
