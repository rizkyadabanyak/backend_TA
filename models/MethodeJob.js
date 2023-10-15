const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const MethodeJob = config.db.define('methode_job', {
    methode_job_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    methode_job_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    methode_job_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    methode_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true
});


module.exports = {MethodeJob}