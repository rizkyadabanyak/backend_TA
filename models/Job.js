const Sequelize = require('sequelize')
const {DataTypes} = Sequelize;

const config= require('../database/config');
const Company= require('../models/Company');




// Job.belongsTo('Company', {
//     foreignKey: "job_company_id",
//     sourceKey: "company_id",
// });

// const belongsToCompany = ()=>{
//     return Job.belongsTo(Company, {
//         foreignKey: "job_company_id",
//         sourceKey: "company_id",
//     });
// }


const Job = config.db.define('job', {
    job_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_company_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    salary_start_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    salary_end_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    experience_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job_title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_slug:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    job_description:{
        type: DataTypes.TEXT('medium'),
    },
    job_qualification:{
        type: DataTypes.TEXT
    },
    job_level:{
        type: DataTypes.ENUM('1','2','3','4'),
        allowNull: false,
    },
    job_type:{
        type: DataTypes.ENUM('full_time','part_time','kontrak'),
        allowNull: false,
    },
    job_methode:{
        type: DataTypes.ENUM('wfo','hybrid','wfh'),
        allowNull: false,
    },
    job_closed:{
        type: DataTypes.DATE
    },
    job_flag:{
        type: DataTypes.ENUM('close','open'),
        allowNull: false,
        defaultValue: 'open'
    },

},{

    freezeTableName:true
});
// (async () => {
//     await config.db.sync();
// })();

module.exports = {Job }