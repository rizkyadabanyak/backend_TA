const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const SalaryEnd = config.db.define('salary_end', {
    salary_end_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salary_end_nominal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
    salary_end_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true
});


module.exports = {SalaryEnd}