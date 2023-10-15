const {Company} = require("../models/Company");
const {JobApply} = require("../models/JobApply");
const {Job} = require("../models/Job");
const CompanyController = require("../controllers/CompanyController");
const CandidateController = require("../controllers/users/CandidateController");
const Joi = require('joi');
const fs = require('fs');
const JobRequest = require("../request/JobRequest");
const baseController = require("../controllers/Controller");
const slug= require('slug');
const {job} = require("../request/JobRequest");
const Sequelize = require('sequelize')
const {Candidate} = require("../models/Candidate");
const {Category} = require("../models/Catogory");
const {DataTypes} = Sequelize;

const index = async (request, h)=>{

    try {
        const header = request.headers.authorization;

        const arrayHeader = header.split(" ");


        // return
        const data_company = await CompanyController.getCompany(arrayHeader[1]);


        const jobs = await request.pgsql.query(
            `SELECT job.*,company.company_name,category.category_name,salary_start.salary_start_nominal,salary_end.salary_end_nominal,experience_time.experience_time_name FROM job ` +
            `JOIN company ON job.job_company_id = company.company_id ` +
            `JOIN category ON job.category_id = category.category_id `+
            `JOIN salary_start ON job.salary_start_id = salary_start.salary_start_id `+
            `JOIN salary_end ON job.salary_end_id = salary_end.salary_end_id `+
            `JOIN experience_time ON job.experience_id = experience_time.experience_time_id 
            where job.job_company_id = ${data_company.company_id}
            `);


        return h.response({
            message : 'sukses mengambil data',
            data : jobs.rows,
            status : "success",
            statusCode : 200
        });

    } catch (error) {
        console.log(error);
    }

}

// export const getHello = async (request, h) => {
//     try {
//         return h.response({
//             pesan : 'hello word'
//         });
//     } catch (error) {}
// };

const getDetailJob = async (request, h)=>{

    try {
        const param = request.params;

        const job = await Job.findOne({ where: { job_id: param.job_id } });



        return h.response({
            message : 'sukses menampilkan data',
            data : job,
            status : "success",
            statusCode : 200
        });


    } catch (error) {
        console.log(error);
    }

}

const store = async (request, h)=>{

    const header = request.headers.authorization;

    const arrayHeader = header.split(" ");

    const data_company= await CompanyController.getCompany(arrayHeader[1]);

    const {category_id,salary_start_id,salary_end_id,experience_id, job_title,job_description,job_level,job_type,job_qualification,job_methode,job_closed} = request.payload;

    const cekValidation= await JobRequest.job(category_id,salary_start_id,salary_end_id,experience_id, job_title,job_description,job_level,job_type,job_qualification,job_methode,job_closed);


    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    var slug_data = slug(job_title, '_');

    // return data_company.company_id;
    try {

        const job = await Job.create({
            job_company_id: data_company.company_id,
            category_id: category_id,
            salary_start_id: salary_start_id,
            salary_end_id: salary_end_id,
            experience_id: experience_id,
            job_title: job_title,
            job_slug: slug_data,
            job_description: job_description,
            job_level: job_level,
            job_type: job_type,
            job_methode: job_methode,
            job_qualification: job_qualification,
            job_closed: job_closed,
        });

        return h.response({
            message : 'sukses membuat data',
            data : job,
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

// const storeIMGUPLOAD = async (request, h)=>{
//
//     // return h.response({
//     //     data : 'ss'
//     // });
//
//     const {job_title,job_description,job_level,job_type,job_tag,job_company,job_salary,job_qualification,job_img} = request.payload;
//
//     // return job_img.hapi;
//     var name = null;
//
//     if (job_img) {
//
//         var random = Math.floor(Math.random() * 99999);
//         const filename = job_img.hapi.filename;
//         const array_filename = filename.split(".");
//         name = 'jobs/'+'job_'+ random +'.'+ array_filename[1];
//
//         const path = "./uploads/" + name;
//         const file = fs.createWriteStream(path);
//
//         file.on('error', (err) => console.error(err));
//
//         job_img.pipe(file);
//
//         job_img.on('end', (err) => {
//             const ret = {
//                 filename: job_img.hapi.filename,
//                 headers: job_img.hapi.headers
//             }
//             return JSON.stringify(ret);
//         })
//
//     }
//
//     try {
//
//         const job = await Job.create({
//             job_title: job_title,
//             job_description: job_description,
//             job_level: job_level,
//             job_type: job_type,
//             job_tag: job_tag,
//             job_company: job_company,
//             job_salary: job_salary,
//             job_qualification: job_qualification,
//             job_banner: name,
//         });
//
//         return h.response({
//             data : job
//         });
//
//     } catch (error) {
//
//         return h.response({
//             message : error.errors[0].message,
//             data : null,
//             status : "danger",
//             statusCode : 400
//
//         });
//
//     }
//
// }


const updateJob = async (request, h)=>{
    const param = request.params;

    const header = request.headers.authorization;

    const arrayHeader = header.split(" ");

    // return ar

    const data_company= await CompanyController.getCompany(arrayHeader[1]);

    const {category_id,salary_start_id,salary_end_id,experience_id, job_title,job_description,job_level,job_type,job_qualification,job_methode,job_closed} = request.payload;

    const cekValidation= await JobRequest.job(category_id,salary_start_id,salary_end_id,experience_id, job_title,job_description,job_level,job_type,job_qualification,job_methode,job_closed);

    // return cekValidation;

    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    try {

        const job =  await Job.update({
            job_company_id: data_company.company_id,
            category_id: category_id,
            salary_start_id: salary_start_id,
            salary_end_id: salary_end_id,
            experience_id: experience_id,
            job_title: job_title,
            job_description: job_description,
            job_level: job_level,
            job_type: job_type,
            job_methode: job_methode,
            job_qualification: job_qualification,
            job_closed: job_closed,
        },{
            where:{
                job_id: param.job_id
            }
        });
        return h.response({
            message : 'sukses merubah data',
            data : job,
            status : "success",
            }
        );

    } catch (error) {

        console.log(error);
        return h.response({
            message : error,
            data : null,
            status : "failed",
            statusCode : 400
        });

    }

}

const getJob = async (job_id)=>{
    const job = await Job.findOne({ where: { job_id: job_id } });

    return job;
}

const applyJob = async (request, h)=>{

    const {job_id} = request.params; // param
    const { deskripsi,cv_file,change_cv_file } = request.payload;  // form

    const header = request.headers.authorization;

    const arrayHeader = header.split(" ");

    const data_candidate = await CandidateController.getCandidate(arrayHeader[1]);

    const data_job = await getJob(job_id);
    //
    // return h.response(data_job);
    candidate_username = data_candidate.candidate_username;


    // return h.response({
    //     message : 'success create data job',
    //     data : job,
    //     status : "success",
    // });

    if (!deskripsi || !change_cv_file || !cv_file){
        if (change_cv_file == 'new'){
            return h.response({
                message : "semua inputan harus di isi",
                data : null,
                status : "failed",
                statusCode : 400
            });
        }
    }

    const cek_job_apply = await JobApply.findOne({
        where: {
            job_apply_job_id: job_id,
            job_apply_candidate_id: String(data_candidate.candidate_id),
            job_apply_company_id: String(data_job.job_company_id)
        }
    });

    if (cek_job_apply){
        return h.response({
            message : "anda sudah melamar pada lowongan ini",
            data : null,
            status : "failed",
            statusCode : 400
        }).code(400);
    }


    if (change_cv_file == 'new'){
        const upload_file = await baseController.upload_file_cv(cv_file,candidate_username);

        // return h.response(upload_file);

        if (upload_file){

            const createJobApply = await JobApply.create({
                job_apply_candidate_id: data_candidate.candidate_id,
                job_apply_company_id: data_job.job_company_id,
                job_apply_job_id: job_id,
                job_apply_description: deskripsi,
            });

            const update_cv = CandidateController.updateCv(data_candidate.candidate_id,upload_file)

            return h.response({
                message : "sukses melamar pekerjaan",
                data : createJobApply,
                status : "success",
                statusCode : 200
            });

        }
    }else {

        if (data_candidate.candidate_cv == null){
            return h.response({
                message : "cv tidak boleh kosong",
                data : null,
                status : "failed",
                statusCode : 400
            }).code(400);
        }


        const createJobApply = await JobApply.create({
            job_apply_candidate_id: data_candidate.candidate_id,
            job_apply_company_id: data_job.job_company_id,
            job_apply_job_id: job_id,
            job_apply_description: deskripsi,
        });

        return h.response({
            message : "sukses melamar pekerjaan",
            data : createJobApply,
            status : "success",
            statusCode : 200
        });
    }


}

const showApplyJob = async  (request, h) =>{

    const header = request.headers.authorization;

    const arrayHeader = header.split(" ");

    const data_candidate = await CandidateController.getCandidate(arrayHeader[1]);
    //
    // const data = await JobApply.findAll(
    //     {
    //         where: {job_apply_candidate_id: String(data_candidate.candidate_id)}
    //     })



    try {
        // const jobs = await request.pgsql.query(
        //     "SELECT job.*,company.company_name,category.category_name,salary_start.salary_start_nominal,salary_end.salary_end_nominal,experience_time.experience_time_name FROM job " +
        //     "JOIN company ON job.job_company_id = company.company_id " +
        //     "JOIN category ON job.category_id = category.category_id " +
        //     "JOIN salary_start ON job.salary_start_id = salary_start.salary_start_id " +
        //     "JOIN salary_end ON job.salary_end_id = salary_end.salary_end_id " +
        //     "JOIN experience_time ON job.experience_id = experience_time.experience_time_id");


        const data = await request.pgsql.query(
            `SELECT job_apply.*,company.company_name,job.job_title FROM job_apply ` +
            `JOIN company ON job_apply.job_apply_company_id = company.company_id ` +
            `JOIN job ON job_apply.job_apply_job_id = job.job_id ` +
            `where job_apply.job_apply_candidate_id = ${data_candidate.candidate_id}`);


        return h.response({
            message : "sukses menampilkan data",
            data : data.rows,
            status : "success",
            statusCode : 200
        });

    } catch (error) {
        console.log(error);
    }


}

module.exports = { store, updateJob , index, getDetailJob,applyJob,showApplyJob }

