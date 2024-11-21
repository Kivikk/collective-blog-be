// Sequelize model for a single user

import { DataTypes } from 'sequelize';
import { sequelize } from '../scripts/initDB.js';

// Define user model

export const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
