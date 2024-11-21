// Import Post model

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
    try {
        //__________________TEMP______________________
        const userCount = await User.count();
        console.log(userCount);
        const user = await User.create({
            firstName: `firstName${userCount}`,
            lastName: `lastName${userCount}`,
            email: `email${userCount}`,
        });
        console.log(user.id);
        //__________________TEMP______________________
        const post = req.body;
        post.author = user.id;
        
        console.log(post);
        if (!post.title || !post.content || !post.cover)
            return res
                .status(400)
                .json({ error: 'Title, content, and cover are required' });

        const newPost = await Post.create(post);

        res.json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const post = await Post.findByPk(id, { include: User });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const {
            body: { title, content, cover },
            params: { id },
        } = req;
        if (!title || !content || !cover)
            return res
                .status(400)
                .json({ error: 'Title, content, and cover are required' });
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        await post.update(req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        await post.destroy();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
