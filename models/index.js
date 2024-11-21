import Account from './Account.js';
import User from './User.js';
import Post from './Post.js';
import DB from '../db.js'

export async function init() {
    Account.hasOne(User, { foreignKey: 'id' });
    User.belongsTo(Account, { foreignKey: 'id' });

    User.hasMany(Post, { foreignKey: 'user_id' });
    Post.belongsTo(User, { foreignKey: 'user_id' });

    await DB.sync();
}

export { Account, User, Post };