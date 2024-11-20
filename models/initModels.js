import { User } from './User.js';
import { Post } from './Post.js';

User.hasMany(Post);
Post.belongsTo(
    User,
    //     {
    //     foreignKey: {
    //         name: 'author',
    //         type: DataTypes.INTEGER,
    //         allowNull: false,
    //     },
    // }
);

await User.sync();
await Post.sync();
