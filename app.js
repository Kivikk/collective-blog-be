import express from 'express';
// import { pool } from './db.js';
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from './controllers/posts.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// routes
app.route('/posts').get(getPosts).post(createPost);
app.route('/posts/:id').get(getPostById).put(updatePost).delete(deletePost);

// console.log(process.env.PORT, process.env.PG_URI);

app.listen(port, () => console.log(`Server is running. Port: ${port}`));
