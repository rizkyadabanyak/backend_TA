const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const SalaryStart = config.db.define('salary_start', {
    salary_start_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salary_start_nominal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
    salary_start_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true
});


module.exports = {SalaryStart}