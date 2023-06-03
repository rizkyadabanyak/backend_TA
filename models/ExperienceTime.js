const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const ExperienceTime = config.db.define('experienceTime', {
    experienceTime_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    experienceTime_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    freezeTableName:true
});


module.exports = {ExperienceTime}