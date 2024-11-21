import { Router } from 'express';

import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/posts.js';

export const postsRouter = Router();

postsRouter.route('/').get(getPosts).post(createPost);
postsRouter.route('/:id').get(getPostById).put(updatePost).delete(deletePost);
