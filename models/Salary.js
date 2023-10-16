const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Salary = config.db.define('salary', {
    salary_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salary_nominal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
    salary_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true
});


module.exports = { Salary }