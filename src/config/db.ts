import { Sequelize } from 'sequelize'

import env from './env.variables';

const db = new Sequelize(env.dbName, env.dbUsername, env.dbPassword, {
    host: env.dbHost,
    dialect: "mysql"
});

export default db;