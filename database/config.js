const Sequelize = require('sequelize')

require('dotenv').config()

const db = new Sequelize(process.env.DATABASE, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'postgres'
});

module.exports = { db }
