const { SalaryEnd } = require("../models/Salary");
const fs = require('fs');
const slug= require('slug');
const { Level } = require("../models/Level");

const store = async (request, h)=>{

    try {

        const data = await Level.bulkCreate([
            { level_name: 'level 1' },
            { level_name: 'level 2' },
            { level_name: 'level 3' },
            { level_name: 'level 4' },
            { level_name: 'level 5' },
        ]);

        return 'success';

    } catch (error) {

        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "danger",
            statusCode : 400

        });

    }

}

module.exports = { store }

