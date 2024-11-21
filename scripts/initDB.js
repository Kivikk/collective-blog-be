import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.PG_URI, {
    dialect: 'postgres',
});
