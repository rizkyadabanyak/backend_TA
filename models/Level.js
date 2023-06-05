const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Level = config.db.define('level', {
    level_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    level_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName:true
});


module.exports = {Level}