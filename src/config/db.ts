import { Sequelize } from 'sequelize'

import { dbName, dbUsername, dbPassword, dbHost } from './env.variables';

const db = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql"
})

export default db;