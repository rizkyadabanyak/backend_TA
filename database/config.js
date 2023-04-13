const Sequelize = require('sequelize')


const db = new Sequelize('skirpsi', 'postgres', '28112000', {
    host: "localhost",
    dialect: 'postgres'
});

module.exports = { db }
