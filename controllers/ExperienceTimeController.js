const { SalaryEnd } = require("../models/SalaryEnd");
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
            experienceTime_name: experience_name,
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
    const { experience_name } = request.payload;

    // return experienceTime_id;
    try {

        const data =  await ExperienceTime.update({
            experienceTime_name: experience_name,
        },{
            where:{
                experienceTime_id: experienceTime_id
            }
        });

        // return data

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

