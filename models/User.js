// Sequelize model for a single user

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Post from './Post.js';

// Define user model

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;
