const Sequelize = require('sequelize')


const db = new Sequelize('hapi', 'postgres', '28112000', {
    host: "hapi.cdzruycabei0.us-east-1.rds.amazonaws.com",
    dialect: 'postgres'
});

// const db = new Sequelize('skirpsi', 'postgres', '28112000', {
//     host: "localhost",
//     dialect: 'postgres'
// });

module.exports = { db }
