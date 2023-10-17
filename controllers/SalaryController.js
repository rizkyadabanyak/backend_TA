const { Salary } = require("../models/Salary");
const Joi = require('joi');
const fs = require('fs');
const slug= require('slug');
const {Job} = require("../models/Job");
const SalaryRequest = require("../request/SalaryRequest");
const {Category} = require("../models/Catogory");

const index = async (request, h)=>{
    try {
        const data = await Salary.findAll();
        return h.response({
            data : data
        });
    } catch (error) {
        console.log(error);
    }
}

const store = async (request, h)=>{

    const { salary } = request.payload;

    const cekValidation= await SalaryRequest.salary(salary);
    // return h.response(cekValidation);
    // return 'xxx';
    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    // return slug_data;
    try {

        const data = await Salary.create({
            salary_nominal: salary,
        });

        return h.response({
            message : "berhasil menampilkan data",
            data : data,
            status : "success",
            statusCode : 200
        });

    } catch (error){
        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "danger",
            statusCode : 400
        });
    }

}


const update = async (request, h)=>{

    const {salary_id} = request.params;
    const { salary,salary_flag } = request.payload;

    // return salary;


    try {

        const data =  await Salary.update({
            salary_nominal: salary,
            salary_flag: salary_flag
        },{
            where:{
                salary_id: salary_id
            }
        });

        return h.response({
            message : 'success edit data',
            data : null,
            status : "success",
            statusCode : 200
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
    const {salary_id} = request.params;


    try {

        const data = await Salary.findOne({ where: { salary_id: salary_id } });


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
const getAllSalary = async (request, h)=>{
    try {
        const data = await Salary.findAll(
            {
                where: {
                    salary_flag: 'active'
                }
            }
        );
        return h.response({
            data : data
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { store,index,update,show,getAllSalary }

