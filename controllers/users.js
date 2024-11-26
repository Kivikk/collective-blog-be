import { User, Post, Account } from '../models/index.js';
import DB from '../db.js';
import bcrypt from 'bcrypt';
// #region Only for TESTS
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            body: { firstName, lastName, email },
        } = req;
        if (!firstName || !lastName || !email)
            return res
                .status(400)
                .json({ error: 'firstName, lastName, and email are required' });
        const found = await User.findOne({ where: { email } });
        if (found)
            return res.status(400).json({ error: 'User already exists' });
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {
            params: { id },
            body: { firstName, lastName, email, password },
        } = req;

        console.log('updateUser', 'Test');
        if (!firstName || !lastName || !email)
            return res
                .status(400)
                .json({ error: 'firstName, lastName, and email are required' });
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// #endregion

export const getUserById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const user = await User.findByPk(id, { include: Post });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        console.log('UserID:', req.userId);
        const account = await Account.findByPk(parseInt(req.userId));

        if (!account)
            return res.status(404).json({ message: 'Account not found' });

        const user = await User.findOne({
            where: { id: req.userId },
            include: [
                {
                    model: Account,
                    attributes: ['email'],
                },
            ],
            attributes: [
                'id',
                'firstName',
                'lastName',
                'createdAt',
                'updatedAt',
            ],
        });

        res.json(formatProfileResponse(user, user.dataValues.Account));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        console.log('updateProfile.UserID:', req.userId);

        const { email, password, firstName, lastName } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const transaction = await DB.transaction();
        try {
            const [updatedUserCount, userRows] = await User.update(
                {
                    firstName: firstName,
                    lastName: lastName,
                },
                {
                    where: { id: req.userId },
                    transaction: transaction,
                    returning: true
                },
            );

            const [updatedAccountCount, accountRows] = await Account.update(
                {
                    email: email,
                    hashedPassword: hashedPassword,
                },
                {
                    where: { id: req.userId },
                    transaction: transaction,
                    returning: true
                },
            );

            await transaction.commit();

            return res.json(formatProfileResponse(userRows[0], accountRows[0]));
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function formatProfileResponse(user, account) {
    console.log(user, account);
    return {
        id: user.dataValues.id,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.firstName,
        createdAt: user.dataValues.createdAt,
        updatedAt: user.dataValues.updatedAt,
        email: account.dataValues.email,
    };
}
