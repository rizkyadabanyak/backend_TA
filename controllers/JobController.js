const {Company} = require("../models/Company");
const {Job} = require("../models/Job");
const Joi = require('joi');

const getAllJob = async (request, h)=>{

    try {
        // const jobs = await Job.findAll({
        //     attributes: ['job_title']
        // });
        const jobs = await Job.findAll();

        return h.response({
            data : jobs
        });

    } catch (error) {
        console.log(error);
    }

}

const getDetailJob = async (request, h)=>{

    try {
        const param = request.params;

        const job = await Job.findOne({ where: { job_id: param.job_id } });

        return h.response({
            data : job
        });

    } catch (error) {
        console.log(error);
    }

}

const storeJob = async (request, h)=>{
    const { name,username,confPassword , email,address, password } = request.payload;

    return name;

    // try {
    //     const param = request.params;
    //
    //     const job = await Job.findOne({ where: { job_id: param.job_id } });
    //
    //     return h.response({
    //         data : job
    //     });
    //
    // } catch (error) {
    //     console.log(error);
    // }

}


module.exports = { storeJob, getAllJob,getDetailJob }

