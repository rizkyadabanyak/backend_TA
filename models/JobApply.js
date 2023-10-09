const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const JobApply = config.db.define('jobApply', {
    job_apply_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_apply_job_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_apply_candidate_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_apply_company_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    job_apply_description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    job_apply_accept:{
        type: DataTypes.ENUM('yes','no'),
        allowNull: false,
        defaultValue: 'no'
    },
},{
    freezeTableName:true,
});


// (async () => {
//     await config.db.sync();
// })();

module.exports = {JobApply}