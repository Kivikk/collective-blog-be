import { Account, User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../db.js';

export const signup = async (req, res) => {
    try {
        console.log('body:', req.body);
        const { email, password, firstName, lastName } = req.body;

        if (!firstName || !lastName || !email)
            return res
                .status(400)
                .json({ error: 'firstName, lastName, and email are required' });

        const transaction = await DB.transaction();
        try {
            const account = await Account.findOne({
                where: { email: email },
                transaction: transaction,
            });

            if (account) {
                await transaction.rollback();
                return res
                    .status(409)
                    .json({ message: 'Account already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAccount = await Account.create(
                {
                    email: email,
                    hashedPassword: hashedPassword,
                },
                { transaction },
            );

            const user = await User.create(
                {
                    id: newAccount.id,
                    firstName: firstName,
                    lastName: lastName,
                },
                { transaction },
            );

            await transaction.commit();
            console.log('Account and User created successfully!');

            const token = jwt.sign({ id: newAccount.id }, process.env.SECRET_KEY, {
                expiresIn: '1h',
            });

            user.email = newAccount.email;
            res.json({ user, token });
        } catch (error) {
            console.error('Error occurred:', error);
            await transaction.rollback();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await Account.findOne({ where: { email: email } });

        if (!account)
            return res.status(404).json({ message: 'Account not found' });

        const isPasswordValid = await bcrypt.compare(
            password,
            account.hashedPassword,
        );

        if (!isPasswordValid)
            return res.status(401).json({ message: 'Invalid credentials' });

        const user = await User.findByPk(account.id);

        const token = jwt.sign({ id: account.id }, process.env.SECRET_KEY, {
            expiresIn: '24h',
        });

        user.email = account.email;
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
