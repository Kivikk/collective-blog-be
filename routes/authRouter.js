import { login, signup } from '../controllers/auth.js';
import { Router } from 'express';

export const authRouter = Router();

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);