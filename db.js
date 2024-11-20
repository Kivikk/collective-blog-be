import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.PG_URI);

import pkg from 'pg';

const { Pool } = pkg;

export const pool = new Pool({ connectionString: process.env.PG_URI });
