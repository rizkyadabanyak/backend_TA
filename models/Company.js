const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Company = config.db.define('company', {
    company_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    company_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    company_email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    company_password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_img:{
        type: DataTypes.STRING,
        // allowNull: false,
    },
    company_address:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    company_refresh_token:{
        type: DataTypes.TEXT
    }
},{

    freezeTableName:true
});


(async () => {
    await config.db.sync();
})();

module.exports = {Company}