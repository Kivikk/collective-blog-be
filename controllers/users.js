import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { ErrorResponse } from '../utils/ErrorResponse.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    const {
        body: { firstName, lastName, email },
    } = req;
    if (!firstName || !lastName || !email)
        return res
            .status(400)
            .json({ error: 'firstName, lastName, and email are required' });
    const found = await User.findOne({ where: { email } });
    if (found) throw new ErrorResponse('User already exists', 400);
    const user = await User.create(req.body);
    res.json(user);
};

export const getUserById = async (req, res) => {
    const {
        params: { id },
    } = req;
    const user = await User.findByPk(id, { include: Post });
    res.json(user);
};

export const updateUser = async (req, res) => {
    const {
        body: { firstName, lastName, email },
        params: { id },
    } = req;
    if (!firstName || !lastName || !email)
        return res
            .status(400)
            .json({ error: 'firstName, lastName, and email are required' });
    const user = await User.findByPk(id);
    if (!user) if (!user) throw new ErrorResponse('User not found', 404);
    await user.update(req.body);
    res.json(user);
    {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const {
        params: { id },
    } = req;
    const user = await User.findByPk(id);
    if (!user) if (!user) throw new ErrorResponse('User not found', 404);
    await user.destroy();
    res.json({ message: 'User deleted' });
};
