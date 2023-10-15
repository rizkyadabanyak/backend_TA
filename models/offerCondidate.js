const Sequelize = require('sequelize')
const config= require('../database/config');
const {DataTypes} = Sequelize;

const OfferCandidate = config.db.define('offer_candidate', {
    offer_candidate_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    offer_candidate_candidate_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    offer_candidate_company_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    offer_candidate_description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    offer_candidate_accept:{
        type: DataTypes.ENUM('yes','no','netral'),
        allowNull: false,
        defaultValue: 'netral'
    },
    offer_candidate_flag:{
        type: DataTypes.ENUM('active','non-active'),
        allowNull: false,
        defaultValue: 'active'
    },
},{
    freezeTableName:true,
});


// (async () => {
//     await config.db.sync();
// })();

module.exports = {OfferCandidate}