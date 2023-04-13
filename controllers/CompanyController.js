const {Company} = require("../models/Company");
const jwt = require('jsonwebtoken');  // used to si
const Joi = require('joi');
const bcrypt = require('bcrypt');
const CompanyRequest = require('../request/CompanyRequest')


const register = async (request, h) =>{

    const { name,username,confPassword , email,address, password } = request.payload;

    const cekValidation= await CompanyRequest.regisReq(name,username,confPassword , email,address, password);

    if (cekValidation.status == 'danger'){

        return h.response(cekValidation);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {

        const company = await Company.create({
            company_name: name,
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
            message : error.errors[0].message,
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

    try {
        const company = await Company.findOne({ where: { company_username: username } });


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

        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await Company.update({company_refresh_token: accessToken},{
            where:{
                company_id: userId
            }
        });

        return h.response({
            message : 'success Login',
            data : {
                token : accessToken
            },
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

const cek = async (request, h)=>{
    let cookie = request.state
    // console.log(request.state.data);
    return h.response({
        message : 'success Login',
        data : {
            token : cookie
        },
        status : "success"
    });
}

module.exports = { register , login, logout ,cek }

