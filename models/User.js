// Sequelize model for a single user

import { DataTypes } from 'sequelize';
import DB from '../db.js';
import { Account } from './index.js';

// Define user model

const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Account,
            key: 'id',
        },
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;