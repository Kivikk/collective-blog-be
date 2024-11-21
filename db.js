import { Sequelize } from 'sequelize';

const DB = new Sequelize(process.env.PG_URI, {
    dialect: 'postgres',
});

export default DB;
