const { SalaryEnd } = require("../models/SalaryEnd");
const fs = require('fs');
const slug= require('slug');
const { TypeJob } = require("../models/TypeJob");

const store = async (request, h)=>{

    try {

        const data = await TypeJob.bulkCreate([
            { typeJob_name: 'Full Time',typeJob_slug : slug('Full Time', '_')},
            { typeJob_name: 'Part Time',typeJob_slug : slug('Part Time', '_')},
            { typeJob_name: 'Kontrak',typeJob_slug : slug('Kontrak', '_')},
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

