const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const ExperienceTime = config.db.define('experience_time', {
    experience_time_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    experience_time_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    experience_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true
});


module.exports = {ExperienceTime}