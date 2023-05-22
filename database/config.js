const Sequelize = require('sequelize')


// const db = new Sequelize('hapi', 'postgres', '28112000', {
//     host: "hapi.cdzruycabei0.us-east-1.rds.amazonaws.com",
//     dialect: 'postgres'
// });

const db = new Sequelize(process.env.DATABASE, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'postgres'
});

module.exports = { db }
