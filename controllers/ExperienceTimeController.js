const { SalaryEnd, Salary} = require("../models/Salary");
const Joi = require('joi');
const fs = require('fs');
const slug= require('slug');
const {Job} = require("../models/Job");
const ExperienceTimeRequest = require("../request/ExperienceTimeRequest");
const {ExperienceTime} = require("../models/ExperienceTime");

const index = async (request, h)=>{
    try {
        const data = await ExperienceTime.findAll();
        return h.response({
            data : data
        });
    } catch (error) {
        console.log(error);
    }
}

const store = async (request, h)=>{

    const { experience_name } = request.payload;

    // return experience_name;

    const cekValidation= await ExperienceTimeRequest.validation(experience_name);

    // return cekValidation;

    // return 'xxx';
    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    // return slug_data;
    try {

        const data = await ExperienceTime.create({
            experience_time_name: experience_name,
        });

        return h.response({
            data : data
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


const update = async (request, h)=>{

    const {experienceTime_id} = request.params;
    const { experience_name,experience_flag } = request.payload;

    // return experienceTime_id;
    try {

        const data =  await ExperienceTime.update({
            experience_time_name: experience_name,
        },{
            where:{
                experience_time_id: experienceTime_id,
                experience_flag: experience_flag,
            }
        });

        // return data

        return h.response({
            message : 'success edit data',
            data : experience_flag,
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
    const {experience_time_id} = request.params;


    try {

        const data = await ExperienceTime.findOne({ where: { experience_time_id: experience_time_id } });


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

const getAllExperienceTime = async (request, h)=>{
    try {

        const data = await ExperienceTime.findAll(
            {
                where: {
                    experience_flag: 'active'
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


module.exports = { store,index,update,show,getAllExperienceTime }

