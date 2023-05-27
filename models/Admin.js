const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Admin = config.db.define('admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    admin_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin_username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    admin_email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    admin_password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin_img:{
        type: DataTypes.STRING,
        // allowNull: false,
    },
    admin_refresh_token:{
        type: DataTypes.TEXT
    }
},{

    freezeTableName:true
});


// (async () => {
//     await config.db.sync();
// })();

module.exports = {Admin}