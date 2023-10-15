const { SalaryEnd } = require("../models/SalaryEnd");
const Joi = require('joi');
const fs = require('fs');
const slug= require('slug');
const {Job} = require("../models/Job");
const SalaryRequest = require("../request/SalaryRequest");
const {Category} = require("../models/Catogory");

const index = async (request, h)=>{
    try {
        const data = await SalaryEnd.findAll();
        return h.response({
            data : data
        });
    } catch (error) {
        console.log(error);
    }
}

const store = async (request, h)=>{

    const { salary_end } = request.payload;

    // return salary_end;

    const cekValidation= await SalaryRequest.salary(salary_end);

    // return cekValidation;

    // return 'xxx';
    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    // return slug_data;
    try {

        const data = await SalaryEnd.create({
            salary_end_nominal: salary_end,
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

    const {salaryEnd_id} = request.params;
    const { salary_end } = request.payload;

    // return salary_end;


    try {

        const data =  await SalaryEnd.update({
            salary_end_nominal: salary_end,
        },{
            where:{
                salary_end_id: salaryEnd_id
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

const show = async (request, h)=>{
    const {salary_end_id} = request.params;


    try {

        const data = await SalaryEnd.findOne({ where: { salary_end_id: salary_end_id } });


        return h.response({
            message : 'sukses menampilkan data',
            data : data,
            status : "success",
            statusCode : 200
        });

    } catch (error) {
        console.log(error);
    }

}


module.exports = { store,index,update,show }

