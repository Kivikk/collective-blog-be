import { Router } from 'express';
import { checkIfPostExists } from '../middleware/checkPost.js';
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/posts.js';

export const postsRouter = Router();

postsRouter.route('/').get(getPosts).post(createPost);
postsRouter
    .route('/:id')
    .get(checkIfPostExists, getPostById)
    .put(checkIfPostExists, updatePost)
    .delete(checkIfPostExists, deletePost);
