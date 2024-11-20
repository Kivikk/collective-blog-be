import { Sequelize } from 'sequelize';
import pkg from 'pg';

export const sequelize = new Sequelize(process.env.PG_URI);

const { Pool } = pkg;

export const pool = new Pool({ connectionString: process.env.PG_URI });
