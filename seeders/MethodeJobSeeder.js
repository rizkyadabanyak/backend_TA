const fs = require('fs');
const slug= require('slug');
const { MethodeJob } = require("../models/MethodeJob");

const store = async (request, h)=>{

    try {

        const data = await MethodeJob.bulkCreate([
            { methodeJob_name: 'Work from office',methodeJob_slug : slug('Work from office', '_')},
            { methodeJob_name: 'Hybrid',methodeJob_slug : slug('Hybrid', '_')},
            { methodeJob_name: 'Work from home',methodeJob_slug : slug('Work from home', '_')},
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

