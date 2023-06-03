const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const SalaryStart = config.db.define('salaryStart', {
    salaryStart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salaryStart_nominal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
},{
    freezeTableName:true
});


module.exports = {SalaryStart}