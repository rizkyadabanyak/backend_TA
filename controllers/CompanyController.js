const {Company} = require("../models/Company");
const jwt = require('jsonwebtoken');  // used to si
const Joi = require('joi');
const bcrypt = require('bcrypt');
const CompanyRequest = require('../request/CompanyRequest');
const slug= require('slug');
const {Admin} = require("../models/Admin");
require('dotenv').config()

const register = async (request, h) =>{


    const { name,username,confPassword , email,address, password } = request.payload;

    const cekValidation= await CompanyRequest.regisReq(name,username,confPassword , email,address, password);

    // return cekValidation;

    if (cekValidation.status == 'danger'){

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
            message : 'success Register',
            data : null,
            status : "success"
        });

    } catch (error) {
        return h.response({
            message : error,
            data : null,
            status : "danger",
            statusCode : 400

        });
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
            status : "danger",
            statusCode : 400
        }).code(400);
    }


    // return company;
    try {
        const company = await Company.findOne({ where: { company_username: username } });


        if (!company){
            return h.response({
                message : 'Wrong Password',
                data : null,
                status : "danger"
            }).code(401)
        }
        const match = await bcrypt.compare(password, company.company_password);

        // return match;
        if(!match){
            return h.response({
                message : 'Wrong Password',
                data : null,
                status : "danger"
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
            status : "danger",
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
            status : "danger",
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



module.exports = { register , login, logout ,cekCompany,getCompany}

