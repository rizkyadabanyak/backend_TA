const Sequelize = require('sequelize')

const config= require('../database/config');

const {DataTypes} = Sequelize;

const Category = config.db.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_slug:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    category_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true
});


// (async () => {
//     await config.db.sync();
// })();

module.exports = {Category}