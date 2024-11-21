import DB from '../db.js';
import { DataTypes } from 'sequelize';

const Account = DB.define(
    'Account',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                fields: ['email'],
                unique: true,
            },
        ],
    },
);

export default Account;
