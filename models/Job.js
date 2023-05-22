const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Job = config.db.define('job', {
    job_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_description:{
        type: DataTypes.TEXT('medium'),
    },
    job_level:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_tag:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_company:{
        type: DataTypes.STRING,
        allowNull: false,
    },job_banner:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    job_salary:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_qualification:{
        type: DataTypes.TEXT
    }
},{

    freezeTableName:true
});


(async () => {
    await config.db.sync();
})();

module.exports = {Job}