const {Company} = require("../models/Company");
const {Job} = require("../models/Job");
const Joi = require('joi');
const fs = require('fs');

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
    const {job_title,job_description,job_level,job_type,job_tag,job_company,job_salary,job_qualification,job_img} = request.payload;

    // return job_img.hapi;
    var name = null;

    if (job_img) {

        var random = Math.floor(Math.random() * 99999);
        const filename = job_img.hapi.filename;
        const array_filename = filename.split(".");
        name = 'jobs/'+'job_'+ random +'.'+ array_filename[1];

        const path = "./uploads/" + name;
        const file = fs.createWriteStream(path);

        file.on('error', (err) => console.error(err));

        job_img.pipe(file);

        job_img.on('end', (err) => {
            const ret = {
                filename: job_img.hapi.filename,
                headers: job_img.hapi.headers
            }
            return JSON.stringify(ret);
        })

    }

    try {

        const job = await Job.create({
            job_title: job_title,
            job_description: job_description,
            job_level: job_level,
            job_type: job_type,
            job_tag: job_tag,
            job_company: job_company,
            job_salary: job_salary,
            job_qualification: job_qualification,
            job_banner: name,
        });

        return h.response({
            data : job
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


const updateJob = async (request, h)=>{
    const {job_title,job_description,job_level,job_type,job_tag,job_company,job_salary,job_qualification,job_img} = request.payload;
    const param = request.params;

    // return param;

    var name = null;

    if (job_img) {

        var random = Math.floor(Math.random() * 99999);
        const filename = job_img.hapi.filename;
        const array_filename = filename.split(".");
        name = 'jobs/'+'job_'+ random +'.'+ array_filename[1];

        const path = "./uploads/" + name;
        const file = fs.createWriteStream(path);

        file.on('error', (err) => console.error(err));

        job_img.pipe(file);

        job_img.on('end', (err) => {
            const ret = {
                filename: job_img.hapi.filename,
                headers: job_img.hapi.headers
            }
            return JSON.stringify(ret);
        })

    }

    try {

        const job =  await Job.update({
            job_title: job_title,
            job_description: job_description,
            job_level: job_level,
            job_type: job_type,
            job_tag: job_tag,
            job_company: job_company,
            job_salary: job_salary,
            job_qualification: job_qualification,
            job_banner: name,
        },{
            where:{
                job_id: param.job_id
            }
        });

        return h.response({
            data : job
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


module.exports = { storeJob, updateJob , getAllJob, getDetailJob }

