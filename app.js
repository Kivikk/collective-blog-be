import express from 'express';
import { init } from './models/index.js';

import { authRouter } from './routes/authRouter.js';
import { postsRouter } from './routes/postsRouter.js';
import { userRouter } from './routes/userRouter.js';
import cors from 'cors'; 

await init();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(express.json());

// routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);

// console.log(process.env.PORT, process.env.PG_URI);

app.listen(port, () => console.log(`Server is running. Port: ${port}`));
