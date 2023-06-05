const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const TypeJob = config.db.define('typeJob', {
    typeJob_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    typeJob_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    typeJob_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    freezeTableName:true
});


module.exports = {TypeJob}