const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const MethodeJob = config.db.define('methodeJob', {
    methodeJob_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    methodeJob_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    methodeJob_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    freezeTableName:true
});


module.exports = {MethodeJob}