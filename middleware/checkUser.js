import { User, Post } from '../models/index.js';
import { ErrorResponse } from '../utils/ErrorResponse.js';

export async function checkIfUserExists(req, res, next) {
    const {
        params: { id },
    } = req;
    const user = await User.findByPk(id, { include: Post });
    if (!user) throw new ErrorResponse('User not found', 404);
    req.user = user;
    next();
}
