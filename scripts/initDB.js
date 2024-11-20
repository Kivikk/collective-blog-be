import { pool } from '../db.js';

createPostTable();

async function createPostTable() {
    try {
        console.log("STRING:", process.env.PG_URI);
        const res = await pool.query(
            'CREATE TABLE Posts (' +
                'id SERIAL PRIMARY KEY, ' +
                'title varchar(255), ' +
                'content varchar(255), ' +
                'cover varchar(255), ' +
                'date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
                'authorId INT) ',
        );
        console.log('TABLE Posts created');

        console.log(res);
    } catch (error) {
        console.log(error);
    }
}


