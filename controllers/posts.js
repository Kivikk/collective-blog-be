// Import Post model
import { ErrorResponse } from '../utils/ErrorResponse.js';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: User });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPost = async (req, res) => {
    const {
        body: { title, content, cover },
    } = req;
    if (!title || !content || !cover)
        return res
            .status(400)
            .json({ error: 'Title, content, and cover are required' });
    const found = await Post.findOne({ where: { title } });
    if (found) throw new ErrorResponse('Post already exists', 400);
    const post = await Post.create(req.body);
    res.json(post);
};

export const getPostById = async (req, res) => {
    const {
        params: { id },
    } = req;
    const post = await Post.findByPk(id, { include: User });
    if (!post) throw new ErrorResponse('Post not found');
    res.json(post);
};

export const updatePost = async (req, res) => {
    const {
        body: { title, content, cover },
        params: { id },
    } = req;
    if (!title || !content || !cover)
        return res
            .status(400)
            .json({ error: 'Title, content, and cover are required' });
    const post = await Post.findByPk(id);
    if (!post) throw new ErrorResponse('Post not found');
    await post.update(req.body);
    res.json(post);
};

export const deletePost = async (req, res) => {
    const {
        params: { id },
    } = req;
    const post = await Post.findByPk(id);
    if (!post) throw new ErrorResponse('Post not found');
    await post.destroy();
    res.json({ message: 'Post deleted' });
};
