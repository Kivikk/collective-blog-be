import express from 'express';
import {pool} from './db.js'

const app = express();

app.use(express.json());

app.get('/posts', async (req, res) => {
    try {
        const {rows} = await pool.query("SELECT * FROM posts;");
        console.log(rows);
       
        res.json(rows);
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT || 3000;

console.log(process.env.PORT, process.env.PG_URI);

app.listen(port, () => console.log(`Server is running. Port: ${port}`));
