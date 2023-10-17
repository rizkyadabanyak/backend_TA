const { SalaryEnd } = require("../models/Salary");
const fs = require('fs');
const slug= require('slug');
const { TypeJob } = require("../models/TypeJob");

const store = async (request, h)=>{

    try {

        const data = await TypeJob.bulkCreate([
            { type_job_name: 'Full Time',type_job_slug : slug('Full Time', '_')},
            { type_job_name: 'Part Time',type_job_slug : slug('Part Time', '_')},
            { type_job_name: 'Kontrak',type_job_slug : slug('Kontrak', '_')},
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

