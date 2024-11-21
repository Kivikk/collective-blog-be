import { User } from './User.js';
import { Post } from './Post.js';

User.hasMany(Post, {
    foreignKey: {
        allowNull: false,
        name: 'author',
    },
});
Post.belongsTo(User, {
    foreignKey: { allowNull: false, name: 'author' },
    onDelete: 'CASCADE',
});

await User.sync();
await Post.sync();
