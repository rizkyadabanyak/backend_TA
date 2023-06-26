const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Candidate = config.db.define('candidate', {
    candidate_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    candidate_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    candidate_username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    candidate_email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    candidate_password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    candidate_img:{
        type: DataTypes.STRING,
        // allowNull: false,
    },
    candidate_address:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    candidate_phone_number:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    candidate_otp:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    candidate_otp_update_at:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    candidate_verif:{
        type: DataTypes.ENUM('yes','no'),
        allowNull: false,
        defaultValue: 'no'
    },
    candidate_refresh_token:{
        type: DataTypes.TEXT
    }
},{

    freezeTableName:true
});


module.exports = {Candidate}