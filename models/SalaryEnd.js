const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const SalaryEnd = config.db.define('salaryEnd', {
    salaryEnd_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salaryEnd_nominal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
},{
    freezeTableName:true
});


module.exports = {SalaryEnd}