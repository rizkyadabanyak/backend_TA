const {Company} = require("../models/Company");
const {JobApply} = require("../models/JobApply");

const {Job} = require("../models/Job");

const jwt = require('jsonwebtoken');  // used to si
const Joi = require('joi');
const bcrypt = require('bcrypt');
const CompanyRequest = require('../request/CompanyRequest');
const slug= require('slug');
const {Admin} = require("../models/Admin");
const CandidateController = require("./users/CandidateController");
require('dotenv').config()

const register = async (request, h) =>{


    const { name,username,confPassword , email,address, password } = request.payload;

    const cekValidation= await CompanyRequest.regisReq(name,username,confPassword , email,address, password);

    // return cekValidation;

    if (cekValidation.status == 'failed'){

        return h.response(cekValidation);
    }
    // return 'xxx';

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    var slug_data = slug(name, '_');
    // return slug_data;

    try {

        const company = await Company.create({
            company_name: name,
            company_slug: slug_data,
            company_username: username,
            company_email: email,
            company_address: address,
            company_password: hashPassword
        });

        return h.response({
            message : 'sukses mendaftar akun',
            data : null,
            status : "success",
            statusCode : 200
        });

    } catch (error) {
        return h.response({
            message : error,
            data : null,
            status : "failed",
            statusCode : 400
        }).code(400);
    }
}

const login = async (request, h) =>{
    // const { username, password } = request.payload;
    const req = request.payload;

    const username = req?.username;
    const password = req?.password;
    // return username;

    if (!username || !password){
        return h.response({
            message :"isi semua field",
            data : null,
            status : "failed",
            statusCode : 400
        }).code(400);
    }


    // return company;
    try {
        const company = await Company.findOne({ where: { company_username: username } });


        if (!company){
            return h.response({
                message : 'password salah',
                data : null,
                status : "failed",
                statusCode : 401
            }).code(401)
        }
        const match = await bcrypt.compare(password, company.company_password);

        // return match;
        if(!match){
            return h.response({
                message : 'password salah',
                data : null,
                status : "failed",
                statusCode : 401
            }).code(400)
        }
        const userId = company.company_id;
        const name = company.company_name;
        const email = company.company_email;
        const username_as = company.company_username;
        const as = 'company';

        const accessToken = jwt.sign({userId, name, email,as,username_as}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1h'
        });

        await Company.update({company_refresh_token: accessToken},{
            where:{
                company_id: userId
            }
        });

        return h.response({
            message : 'success Login',
            token : accessToken,
            data : {
                name : name,
                email : email,
                username_as : username_as,
            },
            status : "success",
            statusCode : 200
        });

        // res.json({ data : accessToken , msg:"Berhasil Login",status : "success"});
    } catch (error) {

        return h.response({
            message : error,
            data : null,
            status : "failed",
            statusCode : 400

        }).code(400);
    }

}
const logout = async (request, h) =>{

    const { username } = request.payload;
    // return username;

    try {

        await Company.update({company_refresh_token: null},{
            where:{
                company_username: username
            }
        });

        return h.response({
            message : 'success Logout',
            data : null,
            status : "success",
            statusCode : 200
        });

        // res.json({ data : accessToken , msg:"Berhasil Login",status : "success"});
    } catch (error) {

        return h.response({
            message : error.errors[0].message,
            data : null,
            status : "failed",
            statusCode : 400

        }).code(400);
    }
}

const getALl = async (request, h)=>{

    try {
        const company = await Company.findAll({
            attributes: ['company_name']
        });

        return h.response({
            data : company
        });

    } catch (error) {
        console.log(error);
    }

}

const cekCompany = async (as,token)=>{

    // return token;

    try {

        const data = await Company.findOne({ where: { company_refresh_token: token } });

        // return data;
        if (data){
            return true
        }else {
            return false
        }

    } catch (error) {
        console.log(error);
    }

}

const getCompany = async (token)=>{

    // return token;

    try {

        const data = await Company.findOne({ where: { company_refresh_token: token } });

        // return data;
        if (data){
            return data
        }else {
            return null
        }

    } catch (error) {
        console.log(error);
    }

}

const jobApplicant = async (request, h)=> {

    const header = request.headers.authorization;

    const arrayHeader = header.split(" ");

    const data_company = await getCompany(arrayHeader[1]);


    const data = await request.pgsql.query(
        `SELECT job_apply.*,company.company_name,job.job_title FROM job_apply ` +
        `JOIN company ON job_apply.job_apply_company_id = company.company_id ` +
        `JOIN job ON job_apply.job_apply_job_id = job.job_id ` +
        `where job_apply.job_apply_company_id = ${data_company.company_id}`);

    return h.response({
        message : "sukses menampilkan data",
        data : data.rows,
        status : "success",
        statusCode : 200
    });
}
const accept = async (request, h)=> {


    const {job_id} = request.params; // param
    const { status } = request.payload;  // form

    // const header = request.headers.authorization;
    //
    // const arrayHeader = header.split(" ");

    // const data_candidate = await CandidateController.getCandidate(arrayHeader[1]);

    const cek_job = Job.findOne({ where: { job_id: job_id } });


    if (!status){
        return h.response({
            message : "status harus di isi",
            data : null,
            status : "failed",
            statusCode : 400
        });
    }

    const data = await JobApply.update({job_apply_accept: status},{
        where:{
            job_apply_job_id: job_id
        }
    })

    if (status == 'yes'){
        return h.response({
            message : "sukses menerima pelamar",
            data : job_id,
            status : "success",
            statusCode : 200
        });
    }

    return h.response({
        message : "sukses menolak pelamar",
        data : job_id,
        status : "success",
        statusCode : 200
    });
}

module.exports = { register , login, logout ,cekCompany,getCompany,accept,jobApplicant}

