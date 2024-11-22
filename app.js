import express from 'express';
import './scripts/initDB.js';
import './models/initModels.js';
import { postsRouter } from './routes/postsRouter.js';
import { userRouter } from './routes/userRouter.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// routes
app.use('/users', userRouter);
app.use('/posts', postsRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running. Port: ${port}`));
