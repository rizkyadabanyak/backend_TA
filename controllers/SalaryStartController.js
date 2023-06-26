const { SalaryStart } = require("../models/SalaryStart");
const Joi = require('joi');
const fs = require('fs');
const slug= require('slug');
const {Job} = require("../models/Job");
const SalaryRequest = require("../request/SalaryRequest");

const index = async (request, h)=>{
    try {
        const data = await SalaryStart.findAll();
        return h.response({
            data : data
        });
    } catch (error) {
        console.log(error);
    }
}

const store = async (request, h)=>{

    const { salary_start } = request.payload;

    // return salary_start;

    const cekValidation= await SalaryRequest.salary(salary_start);

    // return cekValidation;

    // return 'xxx';
    if (cekValidation.status == 'danger'){

        // return 'sss';
        return h.response(cekValidation);
    }

    // return slug_data;
    try {

        const data = await SalaryStart.create({
            salary_start_nominal: salary_start,
        });

        return h.response({
            data : data
        });

    } catch (error) {

        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "dangerr",
            statusCode : 400

        });

    }

}


const update = async (request, h)=>{

    const {salaryStart_id} = request.params;
    const { salary_start } = request.payload;

    // return SalaryStart;

    try {

        const data =  await SalaryStart.update({
            salary_start_nominal: salary_start,
        },{
            where:{
                salary_start_id: salaryStart_id
            }
        });

        return h.response({
            message : 'success edit data',
            data : null,
            status : "success"
        });

    } catch (error) {

        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "danger",
            statusCode : 400

        });

    }

}


module.exports = { store,index,update }

