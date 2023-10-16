import { Sequelize } from 'sequelize'

import env from './env';

const db = new Sequelize(env.dbName, env.dbUsername, env.dbPassword, {
    host: env.dbHost,
    dialect: "mysql",
    port: env.dbPort
});

export default db;