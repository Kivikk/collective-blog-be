import { Sequelize } from 'sequelize';
import pkg from 'pg';

const sequelize = new Sequelize(process.env.PG_URI);

const { Pool } = pkg;

export const pool = new Pool({ connectionString: process.env.PG_URI });

export default sequelize;
