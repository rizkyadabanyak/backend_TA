const fs = require('fs');
const slug= require('slug');
const { MethodeJob } = require("../models/MethodeJob");

const store = async (request, h)=>{

    try {

        const data = await MethodeJob.bulkCreate([
            { methode_job_name: 'Work from office',methode_job_slug : slug('Work from office', '_'),methode_flag:'active'},
            { methode_job_name: 'Hybrid',methode_job_slug : slug('Hybrid', '_'),methode_flag:'active'},
            { methode_job_name: 'Work from home',methode_job_slug : slug('Work from home', '_'),methode_flag:'active'},
        ]);

        return 'success';

    } catch (error) {


        console.log(error)
        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "danger",
            statusCode : 400

        });

    }

}

module.exports = { store }

