const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const TypeJob = config.db.define('type_job', {
    type_job_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type_job_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type_job_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    freezeTableName:true
});


module.exports = {TypeJob}