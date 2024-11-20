// Sequelize model for a single post

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

// Define post model

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
});

// Post.belongsTo(User, {
//     foreignKey: {
//         name: 'author',
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
// });

Post.sync();

export default Post;
